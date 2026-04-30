const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const sonarRoutes = require("./routes/sonarRoutes");
const { getProjects } = require("./controllers/sonarController");
const devRoutes = require("./routes/devRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { logger } = require("./utils/logger");

dotenv.config();

const app = express();
const port = process.env.API_PORT || 5001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api", (req, res) => {
  res.json({ status: "ok", service: "Code Quality Backend", health: "/api/health" });
});

app.get("/api/projects", getProjects);

// Public health endpoint (no /api prefix) to support external probes
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Root quick info
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Code Quality Backend", api: "/api/health" });
});

app.use("/api/sonar", sonarRoutes);
app.use("/api/developers", devRoutes);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`API listening on port ${port}`);
});
