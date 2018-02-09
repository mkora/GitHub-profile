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

export const piedData = (data) => {

  console.log(data);


  return [
    {
      "id": "python",
      "label": "python",
      "value": 125,
      "color": "hsl(239, 70%, 50%)"
    },
    {
      "id": "erlang",
      "label": "erlang",
      "value": 551,
      "color": "hsl(132, 70%, 50%)"
    },
    {
      "id": "scala",
      "label": "scala",
      "value": 282,
      "color": "hsl(84, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 50,
      "color": "hsl(49, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 308,
      "color": "hsl(292, 70%, 50%)"
    },
    {
      "id": "make",
      "label": "make",
      "value": 313,
      "color": "hsl(313, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 525,
      "color": "hsl(250, 70%, 50%)"
    }
  ];
};