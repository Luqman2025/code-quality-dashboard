const { getDeveloperScores } = require("../services/scoreService");

const getDeveloperScoresHandler = async (req, res, next) => {
  try {
    const data = await getDeveloperScores();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDeveloperScores: getDeveloperScoresHandler };
