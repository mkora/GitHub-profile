import React, { Component } from 'react';
import PropTypes from 'prop-types';

import github from '../api/github'

import UserSearch from './UserSearch';
import UserInfo from '../components/UserInfo';
import ErrorNotification from '../components/ErrorNotification';
import RateLimit from '../components/RateLimit';
import UserActivityStatistics from './UserActivityStatistics';
import RepoStatistics from '../components/RepoStatistics';
import LangStatistics from '../components/LangStatistics';

import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';

import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  profile: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
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
        <div>
          <Grid
            container
            alignItems="stretch"
            direction="column"
            justify="flex-start"
            className={classes.profile}
          >
            <Grid key="row-1" item>
              <Grid container spacing={16}>
                <Grid item xs={12} sm={4}>
                  <UserInfo {...profile} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <UserActivityStatistics data={this.state.activity} />
                </Grid>
              </Grid>
            </Grid>
          
            <Grid key="row-2" item>
              <LangStatistics data={this.state.repos}/>
            </Grid>

            <Grid key="row-3" item>
              <RepoStatistics data={this.state.repos}/>
            </Grid>
          </Grid>

          <RateLimit className={classes.profile} {...this.state.ratelimit} />
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
