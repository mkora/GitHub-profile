const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./util/logger');
const controller = require('./controllers/controller.js');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

app.get('/pulse', (req, res) => {
  logger.info('It works!');
  res.status(200);
  return res.json({
    ok: true,
    data: 'It works!',
  });
});

app.get('/api/user/:username', controller.user);

app.get('/api/clear/:username', controller.clear);

app.get('/api/limit', controller.limit);

app.use((req, res) => {
  const message = 'The requested resource can not be found';
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
