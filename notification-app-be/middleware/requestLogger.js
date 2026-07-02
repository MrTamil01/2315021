const Log = require('./logger');

const getLevel = (statusCode) => {
  if (statusCode >= 500) return 'error';
  if (statusCode >= 400) return 'warn';
  return 'info';
};

const requestLogger = (req, res, next) => {
  const startedAt = Date.now();

  res.on('finish', async () => {
    const responseTimeMs = Date.now() - startedAt;
    const timestamp = new Date().toISOString();
    const level = getLevel(res.statusCode);

    try {
      await Log('backend', level, 'middleware', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        responseTimeMs,
        timestamp,
      });
    } catch (error) {

    }
  });

  next();
};

module.exports = requestLogger;
