import React, { Component } from 'react';
import '../css/Statistics.css';
import UserSearch from 'UserSearch';
import UserInfo from 'UserInfo';

class Statistics extends Component {

  state = {
    username: null,
  }

  handleUsernameSearch = (username) => {
    this.setState({
      username
    });
  }  

  render() {
    return (
      <div>
        <UserSearch 
          username={this.state.username} 
          onUsernameSearch={this.handleUsernameSearch} />
        {this.state.username && <UserInfo {...this.state} />}
      </div>

    );
  }

}

export default Statistics;
