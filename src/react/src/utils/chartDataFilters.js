import moment from 'moment';

const formatMonth = timestamp =>
  moment
    .unix(timestamp)
    .format('MMM');

const formatNextMonth = fromTimestamp =>
  moment
    .unix(fromTimestamp)
    .clone()
    .add(7, 'days')
    .format('MMM');

const sliceWeekData = (timestamp, vals) => {
  const current = moment
    .unix(timestamp);
  const next = current
    .clone()
    .add(7, 'days');
  if (current.format('MM') !== next.format('MM')) {
    let week1 = 0;
    let week2 = 0;
    vals.forEach((v, k) => {
      const newDay = current
        .clone()
        .add(k, 'days');
      if (current.format('MM') === newDay.format('MM')) {
        week1 += v;
      } else {
        week2 += v;
      }
    });
    return [
      week1,
      week2
    ];
  }
  return [
    vals.reduce((soFar, v) => soFar + v, 0),
    0
  ];
};

const formatAddedCalendarDate = (fromTimestamp, nth) =>
  moment
    .unix(fromTimestamp)
    .clone()
    .add(nth, 'days')
    .format('YYYY-MM-DD');

export const linedData = (data) => {
  const perMonth = {};
  Object.keys(data).forEach((timestamp) => {
    const date = formatMonth(timestamp);
    const nextDate = formatNextMonth(timestamp);
    const [curr, next] = sliceWeekData(timestamp, data[timestamp]);
    perMonth[date] = (perMonth[date] || 0) + curr;
    perMonth[nextDate] = (perMonth[nextDate] || 0) + next;
  });
  const activity = [];
  Object.keys(perMonth).forEach((date) => {
    activity.push({
      x: date,
      y: perMonth[date]
    });
  });
  return activity;
};

export const calendaredData = (data) => {
  const activity = [];
  Object.keys(data).forEach((timestamp) => {
    data[timestamp].forEach((v, k) => {
      if (v !== 0) {
        activity.push({
          day: formatAddedCalendarDate(timestamp, k),
          value: v
        });
      }
    });
  });
  return activity;
};

export const langPiedData = (data, type = 'byte') => {
  const getValue = (type, lang, repo) => {
    if (type === 'byte') {
      return repo.languages[lang];
    }
    if (type === 'repo') {
      return 1;
    }
    if (type === 'star') {
      return repo.stars;
    }
    if (type === 'commit') {
      return repo.commits;
    }
    return undefined;
  };

  const langs = {};
  Object.keys(data).forEach((repoName) => {
    const repo = data[repoName];

    Object.keys(repo.languages).forEach((lang) => {
      if (langs[lang] === undefined) {
        langs[lang] = {
          id: lang,
          label: lang,
          value: 0,
        };
      }
      const val = getValue(type, lang, repo);
      if (val === undefined) {
        throw new Error(`Cannot find value typeof ${type} in '${repoName}'`);
      }
      langs[lang].value += val;
    });
  });

  // count others
  const limit = 5;
  const values = Object.values(langs);
  if (values.length > limit) {
    values.sort((a, b) => b.value - a.value);
    values.push({
      id: 'Others',
      label: 'Others',
      value: values
        .splice(limit)
        .reduce((soFar, v) => soFar + v.value, 0)
    });
  }
  return values;
};

export const repoPiedData = (data, type = 'star') => {
  const getValue = (type, repo) => {
    if (type === 'star') {
      return repo.stars;
    }
    if (type === 'commit') {
      return repo.commits;
    }
    return undefined;
  };

  const values = [];
  Object.keys(data).forEach((repoName) => {
    const repo = data[repoName];
    const val = getValue(type, repo);
    if (val === undefined) {
      throw new Error(`Cannot find value typeof ${type} in '${repoName}'`);
    }
    values.push({
      id: repoName,
      label: repoName,
      value: val,
    });
  });

  const limit = 7;
  if (values.length > limit) {
    values.sort((a, b) => b.value - a.value);
    values.push({
      id: 'Others',
      label: 'Others',
      value: values
        .splice(limit)
        .reduce((soFar, v) => soFar + v.value, 0)
    });
  }
  return values;
};
