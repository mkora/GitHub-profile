import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { profile, limit, clear } from '../api/github'

import MenuBar from '../components/MenuBar';

import UserSearch from './UserSearch';
import UserInfo from '../components/UserInfo';
import NotificationError from '../components/NotificationError';
import RateLimit from '../components/RateLimit';
import UserActivityStatistics from './UserActivityStatistics';
import RepoStatistics from '../components/RepoStatistics';
import LangStatistics from '../components/LangStatistics';

import 'typeface-roboto';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';

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
    error: {},
    ratelimit: {},
    username: '',
    profile: {},
    repos: [],
    activity: [],
  };

  handleUsernameSearch = async (username) => {
    try {
      const data = await profile(username);
      const { ratelimit } = await limit();
   
      if (data.ok === true) {
        const profile = data.user;
        const {
          repos,
          activity
        } = data;
        this.setState({
          username,
          profile,
          repos,
          activity,
          ratelimit,
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

  handleRefreshButton = async () => {
    const { username } = this.state;
    await clear(username);
    await this.handleUsernameSearch(username);
  }

  handleBackButton = () => {
    this.setState({
      searching: false,
      error: {},
      username: '',
      profile: {},
      repos: [],
      activity: [],
    });
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
          <NotificationError
            {...this.state.error}
            onRefreshClick={this.handleRefreshButton}
          />
        </div>
      );
    }

    if (isProfileRecieved) {
      return (
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
                <UserActivityStatistics
                  onRefreshClick={this.handleRefreshButton}
                  data={this.state.activity}
                />
              </Grid>
            </Grid>
          </Grid>
        
          <Grid key="row-2" item>
            <LangStatistics
              onRefreshClick={this.handleRefreshButton}
              data={this.state.repos}
            />
          </Grid>

          <Grid key="row-3" item>
            <RepoStatistics 
              onRefreshClick={this.handleRefreshButton}
              data={this.state.repos}
            />
          </Grid>

          <Grid key="row-4" item>
            <RateLimit {...this.state.ratelimit} />
          </Grid>
        </Grid>
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
  classes: PropTypes.shape({
    root: PropTypes.string,
    profile: PropTypes.string,
  }).isRequired,
};

export default withRoot(withStyles(styles)(Statistics));
