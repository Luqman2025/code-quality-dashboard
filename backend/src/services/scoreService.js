const { getContributors } = require("./githubService");
const { getMockDevelopers } = require("./mockData");
const { getAuthorIssueCounts, getAverageCoverage, getProjectKeys } = require("./sonarService");
const { logger } = require("../utils/logger");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const scoreLabel = (score) => {
  if (score > 85) {
    return "Excellent";
  }
  if (score >= 70) {
    return "Good";
  }
  return "Needs Improvement";
};

const calculateScore = (developer) => {
  const score = 100 - developer.bugs * 5 - developer.codeSmells * 1 + developer.coverage * 0.2;
  return clamp(Math.round(score), 0, 100);
};

const getDeveloperScores = async (overrides = {}) => {
  const contributors = await getContributors(overrides);
  const mockDevelopers = getMockDevelopers();

  let projectKeys = [];
  let averageCoverage = 0;

  try {
    projectKeys = await getProjectKeys(overrides);
    averageCoverage = await getAverageCoverage(overrides);
  } catch (error) {
    logger.warn("Falling back to mock coverage", error.message);
  }

  const merged = await Promise.all(
    contributors.map(async (contributor) => {
      const mock = mockDevelopers.find((item) => item.name === contributor.login) || {
        bugs: 2,
        codeSmells: 10,
        coverageImpact: 0
      };

      let issues = null;
      try {
        issues = await getAuthorIssueCounts(overrides, contributor.login, projectKeys);
      } catch (error) {
        logger.warn("Falling back to mock issue counts", error.message);
      }

      const coverage = averageCoverage
        ? clamp(averageCoverage, 0, 100)
        : clamp(80 + mock.coverageImpact, 0, 100);

      return {
        name: contributor.login,
        commits: contributor.commits,
        bugs: issues?.bugs ?? mock.bugs,
        codeSmells: issues?.codeSmells ?? mock.codeSmells,
        coverage
      };
    })
  );

  const withScores = merged.map((developer) => {
    const score = calculateScore(developer);
    return {
      ...developer,
      score,
      label: scoreLabel(score)
    };
  });

  const sorted = withScores.sort((a, b) => b.score - a.score);

  return {
    developers: sorted.map((developer, index) => ({
      rank: index + 1,
      ...developer
    }))
  };
};

module.exports = { getDeveloperScores };
