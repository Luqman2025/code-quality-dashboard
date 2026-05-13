const dotenv = require("dotenv");
const { logger } = require("./utils/logger");
const { app } = require("./app");

dotenv.config();

const port = process.env.API_PORT || 5001;

app.listen(port, () => {
  logger.info(`API listening on port ${port}`);
});
