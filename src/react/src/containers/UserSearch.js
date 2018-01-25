import React, { Component } from 'react';

class UserSearch extends Component {

  state = {
    username: '',
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.username) { // TODO: additional validation 
      this.props.onUsernameSearch(this.state.username);
      this.setState({
        username: '' // TODO: ???
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter a GitHub username"
          onChange={this.handleChange}
          value={this.state.user} />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default UserSearch;
