import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
} from '@material-ui/core';

import ChartPie from './ChartPie';
import { repoPiedData } from '../utils/chartDataFilters';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const RepoStatistics = ({ classes, data, onRefreshClick }) => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Kb per Repo"
            data={repoPiedData(data, 'byte')}
            onRefreshClick={onRefreshClick}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Commits per Repo"
            data={repoPiedData(data, 'commit')}
            onRefreshClick={onRefreshClick}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Stars per Repo"
            data={repoPiedData(data, 'star')}
            onRefreshClick={onRefreshClick}
          />
        </Paper>
      </Grid>      
    </Grid>
  );
};

RepoStatistics.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }).isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(RepoStatistics);
