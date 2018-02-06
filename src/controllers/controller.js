const config = require('config');
const logger = require('../util/logger');
const github = require('@octokit/rest')();

const checkToken = () => {
  const token = config.get('GITHUB_ACCESS_TOKEN');
  if (token === '#REQUIRED') {
    const msg = 'GitHub access token is missing. Please, update a config file';
    logger.error(msg);
    throw new Error(msg);
  }
  return token;
};

const paginate = async (method, params = {}) => {
  let response = await method(Object.assign({ per_page: 100 }, params));
  let { data } = response;
  let page = 0;
  while (github.hasNextPage(response)) {
    page += 1;
    logger.debug('Call getNextPage (collecting data) #%d', page);
    response = await github.getNextPage(response); // eslint-disable-line no-await-in-loop
    data = data.concat(response.data);
  }
  return data;
};


const getReposInfo = async (username, repo = {}) => {
  if (repo.name === undefined) {
    const msg = 'Cant find repo to extract';
    logger.error(msg, repo);
    throw new Error(msg);
  }

  const params = {
    owner: username,
    repo: repo.name,
    headers: {
      accept: 'application/vnd.github.v3+json'
    },
  };

  const langs = await github.repos.getLanguages({ ...params });
  logger.debug('Call repos.getLanguages(%s)', repo.name, langs);

  const contributors = await github.repos.getStatsContributors({ ...params });
  logger.debug('Call repos.getStatsContributors(%s)', repo.name, contributors);

  const activity = await github.repos.getStatsCommitActivity({ ...params });
  logger.debug('Call repos.getStatsCommitActivity(%s)', repo.name, activity);

  const commits = Array
    .from(contributors.data)
    .reduce((soFar, v) => (soFar + v.total), 0);

  return {
    stats: {
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      commits,
      languages: langs.data,
    },
    activity: activity.data,
  };
};


module.exports.run = async (req) => {
  const { username } = req.params;
  logger.info('Ask for /api/user/%s', username);

  const token = checkToken();

  logger.debug('Call authenticate');
  await github.authenticate({
    type: 'oauth',
    token,
  });

  const { meta, data } = await github.users.getForUser({ username });
  logger.debug('Call users.getForUser', meta, data);

  const repos = await paginate(github.repos.getForUser, { username });
  logger.debug('Call repos.getForUser', repos);

  const info = await Promise.all(repos.map(async (repo, i) => {
    logger.debug('Found repository #%d', (i + 1), repo);
    return getReposInfo(username, repo);
  }));
  logger.debug('Returned repos data', info);

  const repoStats = {};
  const reposActivity = {};

  info.forEach((item) => {
    const { stats, activity } = item;
    repoStats[stats.name] = stats;

    activity.forEach((v) => {
      if (reposActivity[v.week] === undefined) {
        reposActivity[v.week] = Array(7).fill(0);
      }
      reposActivity[v.week] = v.days
        .map((num, day) => reposActivity[v.week][day] + num);
    });
  });
  logger.debug('Summed activity data from all repos ', reposActivity);

  const result = {
    ok: true,
    ratelimit: {
      limit: meta['x-ratelimit-limit'],
      remaining: meta['x-ratelimit-remaining'],
    },
    user: {
      login: data.login,
      realname: data.name,
      profileUrl: data.html_url,
      avatarUrl: data.avatar_url,
      memberSince: data.created_at,
      company: data.company,
      location: data.location,
      reposNumber: data.public_repos,
    },
    repos: repoStats,
    activity: reposActivity,
  };
  logger.debug('Returned result for %s', username, result);
  return result;
};
