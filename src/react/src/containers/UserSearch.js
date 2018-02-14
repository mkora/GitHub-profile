import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { FormGroup } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  formGroup: {
    margin: theme.spacing.unit,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

class UserSearch extends Component {

  state = {
    username: '',
    error: '',
    searching: false,
  };

  handleChange = (e) => {
    this.setState({
      username: e.target.value,
      error: '',
    });
  };

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
    const { classes } = this.props;
    const hasError = (this.state.error !== '');

    if (this.state.searching) {
      return (
        <CircularProgress size={80} />
      );
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        autoComplete="off">
        <FormGroup row className={classes.formGroup}>
          <div>
          <TextField
            error={hasError}
            required
            placeholder="Enter GitHub Username"
            className={classes.textField}
            onChange={this.handleChange}
            value={this.state.username}
          />
          {hasError &&
            <Typography
              align="center"
              color="error"
              noWrap
              variant="body1">
              {this.state.error}
            </Typography>
          }
          </div>
          <Button
            color="primary"
            type="submit">
            Search
          </Button>
        </FormGroup>
      </form>
    );
  }
}

UserSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSearch);
