import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import ChartPie from 'ChartPie';
import { langPiedData, repoPiedData } from '../utils/chartDataFilters';

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
            <ChartPie
              title="Bytes per Language"
              data={langPiedData(data, 'byte')}
            />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <ChartPie
              title="Repos per Language"
              data={langPiedData(data, 'repo')}
            />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <ChartPie
              title="Stars per Language"
              data={langPiedData(data, 'star')}
            />
          </div>          
        </div>
        <div style={{ clear: 'both'}}>
          <div style={{ float: 'left', width: '33.3%' }}>
            <ChartPie
              title="Commits per Language"
              data={langPiedData(data, 'commit')}
            />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <ChartPie
              title="Commits per Repo" 
              data={repoPiedData(data, 'commit')}
            />
          </div>
          <div style={{ float: 'left', width: '33.3%' }}>
            <ChartPie
              title="Stars per Repo"
              data={repoPiedData(data, 'star')}
            />
          </div>          
        </div>
      </div>
    );
  }

};

export default RepoStatistics;
