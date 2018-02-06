const {
  createLogger,
  format,
  transports
} = require('winston');

const {
  splat,
  combine,
  label,
  prettyPrint
} = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'error',
  format: combine(
    splat(),
    label({ label: 'GITHUB' }),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
  ]
});

module.exports = logger;
