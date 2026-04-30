const axios = require("axios");
const { getMockDevelopers } = require("./mockData");
const { logger } = require("../utils/logger");

const getContributors = async () => {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return getMockDevelopers().map((dev) => ({
      login: dev.name,
      commits: dev.commits
    }));
  }

  try {
    const response = await axios.get(`https://api.github.com/repos/${repo}/contributors`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json"
      }
    });

    return response.data.map((contributor) => ({
      login: contributor.login,
      commits: contributor.contributions
    }));
  } catch (error) {
    logger.warn("Falling back to mock GitHub data", error.message);
    return getMockDevelopers().map((dev) => ({
      login: dev.name,
      commits: dev.commits
    }));
  }
};

module.exports = { getContributors };
