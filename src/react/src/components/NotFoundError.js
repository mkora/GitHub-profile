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
  icon: {
  },
});

const NotFoundError = (props) => {
  const { classes, title } = props;
  return (
    <div className={classes.text}>
      <Typography
        color="textSecondary"
        variant="subheading"
      >
        {title} not found. Press the refresh button
        <IconButton
          className={classes.icon}
          aria-label="Request data"
          onClick={props.onRefreshClick}
        >
          <RefreshIcon
            color="action"
            titleAccess="Refresh"
          />
        </IconButton>
      </Typography>
    </div>
  );
};

NotFoundError.propTypes = {
  classes: PropTypes.object.isRequired,  
  title: PropTypes.string.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NotFoundError);
