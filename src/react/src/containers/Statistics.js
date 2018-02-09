import React, { Component } from 'react';
import github from '../api/github'

import '../css/Statistics.css';
import UserSearch from 'UserSearch';
import UserInfo from 'UserInfo';
import ErrorNotification from 'ErrorNotification';
import RateLimit from 'RateLimit';
import UserActivityStatistics from 'UserActivityStatistics';
import LanguageStatistics from 'LanguageStatistics';

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
        <div>
          <ErrorNotification {...this.state.error} />
        </div>
      );      
    }

    if (isProfileRecieved) {
      return (
        <div>
          <UserInfo {...profile} />
          <UserActivityStatistics data={this.state.activity} />
          <LanguageStatistics data={this.state.repos}/>

          <RateLimit {...this.state.ratelimit} />
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
