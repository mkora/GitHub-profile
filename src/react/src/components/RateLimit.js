import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const RateLimit = ({ classes, remaining, limit }) => (
  <div>
    {remaining > 0 &&
      <Paper className={classes.paper}>
        <Typography align="center">
          Rate Limit: {remaining} / {limit}
        </Typography>
      </Paper>
    }
  </div>
);

RateLimit.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }).isRequired,
  limit: PropTypes.number,
  remaining: PropTypes.number,
};

RateLimit.defaultProps = {
  limit: '',
  remaining: '',
};

export default withStyles(styles)(RateLimit);
