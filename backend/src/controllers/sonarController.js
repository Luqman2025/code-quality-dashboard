const { getDashboardMetrics } = require("../services/sonarService");

const getOverrides = (req) => ({
  sonarUrl: req.header("x-sonarqube-url"),
  sonarToken: req.header("x-sonarqube-token")
});

const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardMetrics(getOverrides(req));
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const data = await getDashboardMetrics(getOverrides(req));
    // return only the projects list for lightweight requests
    res.json({ projects: data.projects || [] });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, getProjects };
