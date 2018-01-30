import React, { Component } from 'react';
import github from '../api/github'

import '../css/Statistics.css';
import UserSearch from 'UserSearch';
import UserInfo from 'UserInfo';
import ErrorNotification from 'ErrorNotification';
import RateLimit from 'RateLimit';

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

        // calc
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
    const isProfileRecieved = this.state.username !== ''
      && this.state.profileUrl !== '';
    const isError = this.state.error
      && this.state.error.message !== undefined;
    const profile = {
      ...this.state.profile,
      username: this.state.username,
    };

    if (isProfileRecieved) {
      return (
        <div>
          {!isError && <UserInfo {...profile} />}
          {!isError && <RateLimit {...this.state.ratelimit} />}
          {isError && <ErrorNotification {...this.state.error} />}
        </div>
      );
    }

    return (
      <div>
        <UserSearch 
          username={this.state.username} 
          onUsernameSearch={this.handleUsernameSearch} />
      </div>
    );
  }

}

export default Statistics;
