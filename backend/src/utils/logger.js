const logger = {
  info: (message) => console.log(`[INFO] ${message}`),
  warn: (message, detail) => console.warn(`[WARN] ${message}${detail ? `: ${detail}` : ""}`),
  error: (message, detail) => console.error(`[ERROR] ${message}${detail ? `: ${detail}` : ""}`)
};

module.exports = { logger };
