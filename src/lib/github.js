const config = require('config');
const logger = require('../util/logger');
const moment = require('moment');
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
      accept: 'application/vnd.github.v3+json',
    },
  };

  const langs = await github.repos.getLanguages({ ...params });
  logger.debug('Call repos.getLanguages(%s)', repo.name, langs);

  // @howto deal with 202 https://developer.github.com/v3/repos/statistics/#a-word-about-caching
  const contributors = await github.repos.getStatsContributors({ ...params });
  if (contributors.meta.status === '202 Accepted') {
    logger.debug('Got 202 status code while calling repos.getStatsContributors(%s)');
    // if call it once again you've got triggered an abusive mechanism (even with a delay)
  }
  logger.debug('Call repos.getStatsContributors(%s)', repo.name, contributors);

  // @howto deal with 202 https://developer.github.com/v3/repos/statistics/#a-word-about-caching
  const activity = await github.repos.getStatsCommitActivity({ ...params });
  if (activity.meta.status === '202 Accepted') {
    logger.debug('Got 202 status code while calling repos.getStatsCommitActivity');
    // if call it once again you've got triggered an abusive mechanism
  }
  logger.debug('Call repos.getStatsCommitActivity(%s)', repo.name, activity);

  const commits = Array
    .from(contributors.data)
    .reduce((soFar, v) => (soFar + v.total), 0); // day light savings offset doesn't metter
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

exports.user = async (username) => {
  const token = checkToken();

  logger.debug('Call authenticate');
  await github.authenticate({
    type: 'oauth',
    token,
  });

  const { data } = await github.users.getForUser({ username });
  logger.debug('Call users.getForUser', data);

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

    Array.from(activity).forEach((v) => {
      const date = moment
        .unix(v.week)
        .startOf('date')
        .unix();
      if (reposActivity[date] === undefined) {
        reposActivity[date] = Array(7).fill(0);
      }
      // timezone & day light savings offset does metter
      reposActivity[date] = v.days
        .map((num, day) => reposActivity[date][day] + num);
    });
  });
  logger.debug('Summed activity data from all repos ', reposActivity);

  const result = {
    ok: true,
    user: {
      login: data.login,
      realname: data.name,
      bio: data.bio,
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

exports.limit = async () => {
  const token = checkToken();

  logger.debug('Call authenticate');
  await github.authenticate({
    type: 'oauth',
    token,
  });

  const { data } = await github.misc.getRateLimit({});
  logger.debug('Call misc.getRateLimit', data);
  const result = {
    ok: true,
    ratelimit: {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
    },
  };
  logger.debug('Returned result for %s', result);
  return result;
};
