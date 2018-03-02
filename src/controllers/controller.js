const logger = require('../util/logger');
const errorHandler = require('../util/errorHandler');
const github = require('../lib/github');

const promise = require('bluebird');
const cacheConfig = require('../config/cache');
const NodeCache = require('node-cache');

promise.promisifyAll(NodeCache.prototype);
const cache = new NodeCache({
  stdTTL: cacheConfig.localDataLifetime,
  checkperiod: cacheConfig.localDataCheckperiod
});

exports.user = async (req, res) => {
  const { username } = req.params;
  const key = `${cacheConfig.localStorageKeyPrefix}${username}`;
  logger.info('Retriving from user/%s', username);

  try {
    const cached = await cache.getAsync(key);
    if (cached) {
      logger.debug('Cache hit: found %s', key);
      return res.json(cached);
    }

    logger.debug('Cache miss: not found %s', key);

    const data = await github.run(username);
    const status = await cache.setAsync(key, data);

    if (status !== true) {
      logger.debug('Can\'t save data to cache', data);
    } else {
      logger.debug('Cache set: save %s', key);
    }
    return res.json(data);
  } catch (err) {
    const code = err.code || 500;
    const message = errorHandler(err);

    res.status(code);
    logger.debug(err);

    if (code >= 500) {
      logger.error(err);
    }
    return res.json(message);
  }
};

exports.clear = async (req, res) => {
  const { username } = req.params;
  const key = `${cacheConfig.localStorageKeyPrefix}${username}`;

  logger.info('Retriving from clear/%s', username);

  try {
    const deleted = await cache.del(key);
    return res.json({
      ok: (deleted > 0),
    });
  } catch (err) {
    logger.error(err);

    const message = errorHandler(err);
    res.status(500);
    return res.json(message);
  }
};

exports.limit = async (req, res) => {
  logger.info('Retriving from limit/%s');
};
