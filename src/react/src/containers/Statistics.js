import React, { Component } from 'react';
import PropTypes from 'prop-types';

import github from '../api/github'

import UserSearch from './UserSearch';
import UserInfo from '../components/UserInfo';
import ErrorNotification from '../components/ErrorNotification';
import RateLimit from '../components/RateLimit';
import UserActivityStatistics from './UserActivityStatistics';
import RepoStatistics from '../components/RepoStatistics';

import 'material-design-icons'; // ?
import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';

import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Statistics extends Component {

  state = {
    error: {}, // { message, documentation_url, errors }
    ratelimit: {}, // { limit, remaining }
    username: '',
    profile: {},
    repos: [],
    activity: [],
  };

  handleUsernameSearch = async (username) => {
    try {
      const data = await github(username);

      if (data.ok === true) {
        const profile = data.user;
        const {
          ratelimit,
          repos,
          activity
        } = data;
        this.setState({
          username,
          ratelimit,
          profile,
          repos,
          activity
        });
      } else {
        this.setState({
          username,
          error: { message: 'Unknown error' }
        });
      }
    } catch (error) {
      this.setState({
        username,
        error: error.data
      });
    }
  }

  render() {
    const { classes } = this.props;
    const isProfileRecieved = this.state.username !== ''
      && this.state.profileUrl !== '';
    const isError = this.state.error
      && this.state.error.message !== undefined;
    const profile = {
      ...this.state.profile,
      username: this.state.username,
    };

    if (isError) {
      return (
        <div className={classes.root}>
          <ErrorNotification {...this.state.error} />
        </div>
      );      
    }

    if (isProfileRecieved) {
      return (
        <div className={classes.root}>
          <UserInfo {...profile} />
          <UserActivityStatistics data={this.state.activity} />
          <RepoStatistics data={this.state.repos}/>

          <RateLimit {...this.state.ratelimit} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <UserSearch 
          username={this.state.username} 
          onUsernameSearch={this.handleUsernameSearch} 
        />
      </div>
    );
  }
}

Statistics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Statistics));
