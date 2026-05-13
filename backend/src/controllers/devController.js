const { getDeveloperScores } = require("../services/scoreService");

const getOverrides = (req) => ({
  githubToken: req.header("x-github-token"),
  githubRepo: req.header("x-github-repo")
});

const getDeveloperScoresHandler = async (req, res, next) => {
  try {
    const data = await getDeveloperScores(getOverrides(req));
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDeveloperScores: getDeveloperScoresHandler };
