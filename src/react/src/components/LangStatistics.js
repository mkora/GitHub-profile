import React from 'react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import PropTypes from 'prop-types';
import ChartPie from './ChartPie';
import { langPiedData } from '../utils/chartDataFilters';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const LangStatistics = (props) => {
  const { classes, data } = props;
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Bytes per Language"
            data={langPiedData(data, 'byte')}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Repos per Language"
            data={langPiedData(data, 'repo')}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper className={classes.paper}>
          <ChartPie
            title="Commits per Language"
            data={langPiedData(data, 'commit')}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

LangStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(LangStatistics);
