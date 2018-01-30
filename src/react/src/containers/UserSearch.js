import React, { Component } from 'react';

class UserSearch extends Component {

  state = {
    username: '',
    error: '',
    searching: false,
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
      error: '',
    });
  }

  validateUsername = (str) =>
    RegExp('^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$', 'i').test(str);

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;

    if (username && this.validateUsername(username)) {
      this.setState({
        searching: true,
        username: ''
      });
      this.props.onUsernameSearch(username);
    } else {
      this.setState({
        error: 'You entered invalid user name'
      });
    }
  }

  render() {
    const hasError = (this.state.error !== '');
    if (this.state.searching) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            className={hasError ? 'input-error' : ''}
            placeholder="Enter a GitHub username"
            onChange={this.handleChange}
            value={this.state.username} />
          <input type="submit" value="Search" />
        </div>
        <div>{this.state.error}</div>
      </form>
    );
  }
}

export default UserSearch;
