import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import ChartPie from './ChartPie';
import { repoPiedData } from '../utils/chartDataFilters';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const RepoStatistics = (props) => {
  const { classes, data } = props;
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Kb per Repo"
            data={repoPiedData(data, 'byte')}
            onRefreshClick={props.onRefreshClick}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Commits per Repo"
            data={repoPiedData(data, 'commit')}
            onRefreshClick={props.onRefreshClick}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Stars per Repo"
            data={repoPiedData(data, 'star')}
            onRefreshClick={props.onRefreshClick}
          />
        </Paper>
      </Grid>      
    </Grid>
  );
};

RepoStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(RepoStatistics);
