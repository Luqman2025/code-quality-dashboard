const { getContributors } = require("./githubService");
const { getMockDevelopers } = require("./mockData");

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

const getDeveloperScores = async () => {
  const contributors = await getContributors();
  const mockDevelopers = getMockDevelopers();

  const merged = contributors.map((contributor) => {
    const mock = mockDevelopers.find((item) => item.name === contributor.login) || {
      bugs: 2,
      codeSmells: 10,
      coverageImpact: 0
    };

    const coverage = clamp(80 + mock.coverageImpact, 0, 100);

    return {
      name: contributor.login,
      commits: contributor.commits,
      bugs: mock.bugs,
      codeSmells: mock.codeSmells,
      coverage
    };
  });

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
