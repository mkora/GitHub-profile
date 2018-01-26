const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const errorHandler = require('./util/errorHandler');
const github = require('@octokit/rest')();

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

app.get('/api/user/:username', async (req, res, next) => {
  const paginate = async (method, params = {}) => {
    let response = await method(Object.assign({ per_page: 100 }, params));
    let { data } = response;
    while (github.hasNextPage(response)) {
      response = await github.getNextPage(response); // eslint-disable-line no-await-in-loop
      data = data.concat(response.data);
    }
    return data;
  };

  const { username } = req.params;
  const token = config.get('GITHUB_ACCESS_TOKEN');
  if (token === '#REQUIRED') {
    return next(new Error('GitHub access token is missing. Please, update a config file'));
  }

  try {
    await github.authenticate({
      type: 'oauth',
      token,
    });

    const { meta, data } = await github.users.getForUser({ username });
    const repos = await paginate(github.repos.getForUser, { username });
    const activity = {};
    try {
      const repoStats = await Promise.all(repos.map(async (repo) => {
        const [
          langs,
          contributors,
          commitActivity,
        ] = await Promise.all([
          github.repos.getLanguages({
            owner: username,
            repo: repo.name,
            per_page: 100
          }),
          github.repos.getStatsContributors({
            owner: username,
            repo: repo.name
          }),
          github.repos.getStatsCommitActivity({
            owner: username,
            repo: repo.name
          })
        ]);

        const commits = Array
          .from(contributors.data)
          .reduce((soFar, v) => (soFar + v.total), 0);

        Array.from(commitActivity.data).forEach((v) => {
          if (activity[v.week] === undefined) {
            activity[v.week] = Array(7).fill(0);
          }
          activity[v.week] = v.days
            .map((num, day) => activity[v.week][day] + num);
        });

        return {
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          commits,
          languages: langs.data,
        };
      }));

      return res.json({
        ok: true,
        ratelimit: {
          limit: meta['x-ratelimit-limit'],
          remaining: meta['x-ratelimit-remaining'],
        },
        user: {
          login: data.login,
          realname: data.name,
          profileUrl: data.url,
          avatarUrl: data.avatar_url,
          memberSince: data.created_at,
          company: data.company,
          location: data.location,
          reposNumber: data.public_repos,
        },
        repos: repoStats,
        activity,
      });
    } catch (err) {
      res.status(err.code || 500);
      const message = errorHandler(err);
      return res.json(message);
    }
  } catch (err) {
    res.status(err.code);
    const message = errorHandler(err);
    return res.json(message);
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
