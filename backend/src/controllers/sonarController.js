const { getDashboardMetrics } = require("../services/sonarService");

const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardMetrics();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const data = await getDashboardMetrics();
    // return only the projects list for lightweight requests
    res.json({ projects: data.projects || [] });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard, getProjects };
