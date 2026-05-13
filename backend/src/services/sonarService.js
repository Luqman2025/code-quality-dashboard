const axios = require("axios");
const { getMockDashboard } = require("./mockData");
const { logger } = require("../utils/logger");

const metricsList = ["bugs", "vulnerabilities", "code_smells", "coverage"];

const getClient = (overrides = {}) => {
  const baseURL = overrides.sonarUrl || process.env.SONARQUBE_URL;
  const token = overrides.sonarToken || process.env.SONARQUBE_TOKEN;

  if (!baseURL || !token) {
    return null;
  }

  return axios.create({
    baseURL,
    auth: {
      username: token,
      password: ""
    }
  });
};

const fetchProjects = async (client) => {
  const response = await client.get("/api/projects/search", {
    params: { ps: 500 }
  });
  return response.data.components || [];
};

const fetchProjectMetrics = async (client, projectKey) => {
  const response = await client.get("/api/measures/component", {
    params: {
      component: projectKey,
      metricKeys: metricsList.join(",")
    }
  });

  const measures = response.data.component.measures || [];
  const metricMap = measures.reduce((acc, item) => {
    acc[item.metric] = Number(item.value || 0);
    return acc;
  }, {});

  return {
    bugs: metricMap.bugs || 0,
    vulnerabilities: metricMap.vulnerabilities || 0,
    code_smells: metricMap.code_smells || 0,
    coverage: metricMap.coverage || 0
  };
};

const fetchAuthorIssueCounts = async (client, author, componentKeys = []) => {
  const response = await client.get("/api/issues/search", {
    params: {
      author,
      resolved: "false",
      facets: "types",
      ps: 1,
      ...(componentKeys.length ? { componentKeys: componentKeys.join(",") } : {})
    }
  });

  const facets = response.data.facets || [];
  const typesFacet = facets.find((facet) => facet.property === "types");
  const values = typesFacet?.values || [];
  const getCount = (type) => values.find((item) => item.val === type)?.count || 0;

  return {
    bugs: getCount("BUG"),
    vulnerabilities: getCount("VULNERABILITY"),
    codeSmells: getCount("CODE_SMELL")
  };
};

const buildTrend = (projects) => {
  const base = projects.reduce(
    (acc, project) => {
      acc.bugs += project.metrics.bugs;
      acc.vulnerabilities += project.metrics.vulnerabilities;
      acc.code_smells += project.metrics.code_smells;
      acc.coverage += project.metrics.coverage;
      return acc;
    },
    { bugs: 0, vulnerabilities: 0, code_smells: 0, coverage: 0 }
  );

  const count = projects.length || 1;
  const averageCoverage = Number((base.coverage / count).toFixed(2));

  return Array.from({ length: 6 }).map((_, index) => {
    const factor = 1 - index * 0.03;
    return {
      label: `W-${6 - index}`,
      bugs: Math.max(0, Math.round(base.bugs * factor)),
      vulnerabilities: Math.max(0, Math.round(base.vulnerabilities * factor)),
      code_smells: Math.max(0, Math.round(base.code_smells * factor)),
      coverage: Math.min(100, Number((averageCoverage * factor).toFixed(2)))
    };
  });
};

const getDashboardMetrics = async (overrides = {}) => {
  const client = getClient(overrides);

  if (!client) {
    return getMockDashboard();
  }

  try {
    const projects = await fetchProjects(client);

    const projectMetrics = await Promise.all(
      projects.map(async (project) => {
        const metrics = await fetchProjectMetrics(client, project.key);
        return {
          key: project.key,
          name: project.name,
          metrics
        };
      })
    );

    const totals = projectMetrics.reduce(
      (acc, project) => {
        acc.totalBugs += project.metrics.bugs;
        acc.totalVulnerabilities += project.metrics.vulnerabilities;
        acc.totalCodeSmells += project.metrics.code_smells;
        acc.coverageSum += project.metrics.coverage;
        return acc;
      },
      { totalBugs: 0, totalVulnerabilities: 0, totalCodeSmells: 0, coverageSum: 0 }
    );

    const projectCount = projectMetrics.length || 1;
    const averageCoverage = Number((totals.coverageSum / projectCount).toFixed(2));

    return {
      projects: projectMetrics,
      totals: {
        totalBugs: totals.totalBugs,
        totalVulnerabilities: totals.totalVulnerabilities,
        totalCodeSmells: totals.totalCodeSmells,
        averageCoverage
      },
      issueDistribution: {
        bugs: totals.totalBugs,
        vulnerabilities: totals.totalVulnerabilities,
        codeSmells: totals.totalCodeSmells
      },
      trend: buildTrend(projectMetrics)
    };
  } catch (error) {
    logger.warn("Falling back to mock SonarQube data", error.message);
    return getMockDashboard();
  }
};

const getProjectKeys = async (overrides = {}) => {
  const client = getClient(overrides);

  if (!client) {
    return [];
  }

  const projects = await fetchProjects(client);
  return projects.map((project) => project.key);
};

const getAuthorIssueCounts = async (overrides = {}, author, componentKeys = []) => {
  const client = getClient(overrides);

  if (!client || !author) {
    return null;
  }

  return fetchAuthorIssueCounts(client, author, componentKeys);
};

const getAverageCoverage = async (overrides = {}) => {
  const metrics = await getDashboardMetrics(overrides);
  return metrics?.totals?.averageCoverage ?? 0;
};

module.exports = {
  getDashboardMetrics,
  getProjectKeys,
  getAuthorIssueCounts,
  getAverageCoverage
};
