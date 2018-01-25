const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const octokit = require('@octokit/rest')();

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

app.get('/pulse', (req, res) => {
  res.status(200);
  return res.json({
    ok: true,
    data: 'It works!'
  });
});

app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { data } = await octokit.users.getForUser({ username });
    return res.json({
      ok: true,
      data
    });
  } catch (err) {
    res.status(err.code);
    return res.json(JSON.parse(err.message));
  }
});

app.use((req, res) => {
  res.status(404);
  return res.json({
    message: 'The requested resource couldn\'t be found',
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (process.env.NODE_ENV === 'production') {
    delete err.stack; // eslint-disable-line no-param-reassign
  }

  res.status(err.status || 500);
  console.error(err.stack); // eslint-disable-line no-console
  res.json({
    message: 'An unexpectable error has occurred, please try again later.',
  });

  return next();
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`); // eslint-disable-line no-console
});
