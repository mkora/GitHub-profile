import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';

const styles = theme => ({
  text: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
  },
});

const NotFoundError = ({
  classes,
  title,
  onRefreshClick
}) => (
  <div className={classes.text}>
    <Typography
      color="textSecondary"
      variant="subheading"
    >
      {title} not found
      {onRefreshClick !== undefined &&
        <span>
          .&nbsp;Press the refresh button
          <IconButton
            className={classes.icon}
            aria-label="Request data"
            onClick={onRefreshClick}
          >
            <RefreshIcon
              color="action"
              titleAccess="Refresh"
            />
          </IconButton>
        </span>
      }
    </Typography>
  </div>
);

NotFoundError.propTypes = {
  classes: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  onRefreshClick: PropTypes.func,
};

NotFoundError.defaultProps = {
  title: 'Data',
  onRefreshClick: undefined,
};

export default withStyles(styles)(NotFoundError);
