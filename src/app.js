const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./util/logger');

const controller = require('./controllers/controller.js');
const errorHandler = require('./util/errorHandler');

const promise = require('bluebird');
const cacheConfig = require('./config/cache');
const NodeCache = require('node-cache');

promise.promisifyAll(NodeCache.prototype);
const cache = new NodeCache({
  stdTTL: cacheConfig.localDataLifetime,
  checkperiod: cacheConfig.localDataCheckperiod
});

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

app.get('/pulse', (req, res) => {
  logger.info('Checking if api works...');
  res.status(200);
  return res.json({
    ok: true,
    data: 'It works!'
  });
});

app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  const key = `${cacheConfig.localStorageKeyPrefix}${username}`;

  try {
    const cached = await cache.getAsync(key);
    if (cached) {
      logger.info('Cache hit: found %s', key);
      return res.json(cached);
    }
    logger.info('Cache miss: not found %s', key);
    const data = await controller.run(req);
    const status = await cache.setAsync(key, data);
    if (status !== true) {
      logger.info('Can\'t save data to cache', data);
    } else {
      logger.info('Cache set: save %s', key);
    }
    logger.info('Send data:success');
    return res.json(data);
  } catch (err) {
    logger.info('Send data:error');
    const code = err.code || 500;
    res.status(code);
    const message = errorHandler(err);
    logger.debug(err);
    if (code >= 500) {
      logger.error(err);
    }
    return res.json(message);
  }
});

app.use((req, res) => {
  const message = 'The requested resource couldn\'t be found';
  logger.debug(message);
  res.status(404);
  return res.json({ message });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const code = err.code || 500;
  const message = 'An unexpectable error has occurred, please try again later';
  res.status(code);
  res.json({ message });
  logger.debug(err);
  if (code >= 500) {
    logger.error(err);
  }
  return next();
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  logger.info('Listening on http://localhost:%d/', port);
});
