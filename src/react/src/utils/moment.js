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

const formatCalendarDate = timestamp =>
  moment
    .unix(timestamp)
    .format('YYYY-MM-DD');

const formatAddedCalendarDate = (fromTimestamp, nth) =>
  moment
    .unix(fromTimestamp)
    .clone()
    .add(nth, 'days')
    .format('YYYY-MM-DD');

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

export {
  sliceWeekData,
  formatMonth,
  formatNextMonth,
  formatCalendarDate,
  formatAddedCalendarDate
};
