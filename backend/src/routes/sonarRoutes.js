const express = require("express");
const { getDashboard, getProjects } = require("../controllers/sonarController");

const router = express.Router();

router.get("/dashboard", getDashboard);
router.get("/projects", getProjects);

module.exports = router;
