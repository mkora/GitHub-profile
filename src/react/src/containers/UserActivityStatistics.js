import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ChartLine from 'ChartLine';
import ChartCalendar from 'ChartCalendar';
import { linedData, calendaredData } from '../utils/chartDataFilters'

class UserActivityStatistics extends Component {

  static propTypes = {
//  data: PropTypes.string.isRequired,
  };
    
  static defaultProps = {
//  data: '',
  };

  state = {
    isLineChart: true,
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
          <ChartLine
            title="User Activity"
            data={linedData(data)}
          />
        }
        {
          (!this.state.isLineChart) &&
          <ChartCalendar
            title="User Activity"
            data={calendaredData(data)}
          />
        }
      </div>
    );
  }

};

export default UserActivityStatistics;
