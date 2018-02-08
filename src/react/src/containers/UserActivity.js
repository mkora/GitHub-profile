import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ChartLine from 'ChartLine';
import ChartCalendar from 'ChartCalendar';
import {
  sliceWeekData,
  formatMonth,
  formatNextMonth,
  formatAddedCalendarDate as formatAddedDate
} from '../utils/moment';

class UserActivity extends Component {

  static propTypes = {
//  data: PropTypes.string.isRequired,
  };
    
  static defaultProps = {
//  data: '',
  };

  state = {
    isLineChart: false,
  }

  static linedData(data) {
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
  }

  static calendaredData(data) {
    const activity = [];
    Object.keys(data).forEach((timestamp) => {
      data[timestamp].forEach((v, k) => {
        if (v !== 0) {
          activity.push({
            day: formatAddedDate(timestamp, k),
            value: v
          });
        }
      });
    });
    return activity;
  }

  handleSwitchClick = (e) => {
    this.setState((state) => {
      return {
        isLineChart: !state.isLineChart
      };
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div style={{ clear: 'both'}}>
        <input type="button" onClick={this.handleSwitchClick} value="Switch view" />
        {
          this.state.isLineChart &&
          <ChartLine data={UserActivity.linedData(data)} />
        }
        {
          !this.state.isLineChart &&
          <ChartCalendar data={UserActivity.calendaredData(data)} />
        }
      </div>
    );
  }

};

export default UserActivity;
