import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const RateLimit = props => (
  <Paper className={props.classes.paper}>
    <Typography align="center">
      Rate Limit: {props.remaining} / {props.limit}
    </Typography>
  </Paper>
);

RateLimit.propTypes = {
  classes: PropTypes.object.isRequired,
  limit: PropTypes.string.isRequired,
  remaining: PropTypes.string.isRequired,
};

export default withStyles(styles)(RateLimit);
