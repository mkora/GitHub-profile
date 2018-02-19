import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import { withStyles } from 'material-ui/styles';
import NotFoundError from './NotFoundError';

const styles = theme => ({
  chart: {
    height: 250,
  },
});

const ChartLine = (props) => {
  const { data, title, classes } = props;
  if (data.length === 0) {
    return (
      <NotFoundError
        title={title}
        onRefreshClick={props.onRefreshClick}
      />
    );
  }

  return (
    <div className={classes.chart}>
      <ResponsiveLine
        data={[
        {
          id: 'commits',
          data: props.data
        }]}
        margin={{
          top: 10,
          right: 30,
          bottom: 28,
          left: 35
        }}
        minY="0"
        curve="monotoneX"
        colors="#2196F3"
        enableGridX={false}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: null,
          legendOffset: 0,
          legendPosition: 'center'
        }}
        enableDots
        enableArea
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={[]}
      />
    </div>
  );
};

ChartLine.propTypes = {
  classes: PropTypes.object.isRequired,  
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChartLine);
