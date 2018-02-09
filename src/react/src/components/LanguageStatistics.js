import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ChartPie from 'ChartPie';
import { piedData } from '../utils/chartDataFilters';

class LanguageStatistics extends Component {

  static propTypes = {
//  repos: PropTypes.string.isRequired,
  };
    
  static defaultProps = {
//  repos: '',
  };

  render() {
    const { data } = this.props;

    return (
      <div style={{ clear: 'both'}}>
        <ChartPie data={piedData(data)} />
      </div>
    );
  }

};

export default LanguageStatistics;
