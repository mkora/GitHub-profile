import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

const MenuBar = ({
  classes,
  onBackClick,
  onRefreshClick
}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Go Back"
          onClick={onBackClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classes.flex}
        >
          GitHub User Overview
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Go Back"
          onClick={onRefreshClick}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
);

MenuBar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    flex: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(MenuBar);
