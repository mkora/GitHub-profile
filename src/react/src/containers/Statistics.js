import React, { Component } from 'react';
import axios from 'axios';

import '../css/Statistics.css';
import UserSearch from 'UserSearch';
import UserInfo from 'UserInfo';
import ErrorNotification from 'ErrorNotification';

class Statistics extends Component {

  /**
   * error = {
   *     message, 
   *     documentation_url, 
   *     errors
   *   }
   */

  state = {
    username: null,
    error: {},
  }

  handleUsernameSearch = async (username) => {
    try {
      const data = await axios.get(`/api/user/${username}`);
      
      this.setState({
        username
      });
    } catch (error) {
      const { response } = error;
      this.setState({
        error: response.data
      });
    }
  }  

  render() {
    return (
      <div>
        <UserSearch 
          username={this.state.username} 
          onUsernameSearch={this.handleUsernameSearch} />
        
        {this.state.username && <UserInfo {...this.state} />}
        {this.state.error && <ErrorNotification {...this.state.error} />}

      </div>

    );
  }

}

export default Statistics;
