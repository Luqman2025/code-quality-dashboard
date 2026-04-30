const express = require("express");
const { getDeveloperScores } = require("../controllers/devController");

const router = express.Router();

router.get("/scores", getDeveloperScores);

module.exports = router;
