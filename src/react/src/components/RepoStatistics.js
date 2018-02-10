import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ChartPie from 'ChartPie';
import { langPiedData } from '../utils/chartDataFilters';

class RepoStatistics extends Component {

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
        <div style={{ clear: 'both'}}>
          <div style={{ float: 'left', width: '33.3%' }}>
            <p>Bytes per Languages</p>
            <ChartPie data={langPiedData(data, 'byte')} />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <p>Repos per Languages</p>
            <ChartPie data={langPiedData(data, 'repo')} />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <p>Stars per Languages</p>
            <ChartPie data={langPiedData(data, 'star')} />
          </div>          
        </div>
        <div style={{ clear: 'both'}}>
          <div style={{ float: 'left', width: '33.3%' }}>
            <p>Commits per Languages</p>
            <ChartPie data={langPiedData(data, 'commit')} />
          </div> 
        </div>
      </div>
    );
  }

};

export default RepoStatistics;
