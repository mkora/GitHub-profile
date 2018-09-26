import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import ChartPie from './ChartPie';
import { langPiedData } from '../utils/chartDataFilters';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});

const LangStatistics = ({ classes, data, onRefreshClick }) => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={4}>
      <Paper className={classes.paper}>
        <ChartPie
          title="Kb per Language"
          data={langPiedData(data, 'byte')}
          onRefreshClick={onRefreshClick}
        />
      </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper className={classes.paper}>
        <ChartPie
          title="Repos per Language"
          data={langPiedData(data, 'repo')}
          onRefreshClick={onRefreshClick}
        />
      </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper className={classes.paper}>
        <ChartPie
          title="Commits per Language"
          data={langPiedData(data, 'commit')}
          onRefreshClick={onRefreshClick}
        />
      </Paper>
    </Grid>
  </Grid>
);

LangStatistics.propTypes = {
  classes: PropTypes.shape({
    paper: PropTypes.string,
  }).isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(LangStatistics);
