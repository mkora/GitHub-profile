import React from 'react';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NotFoundError from './NotFoundError';

const colors = [
  '#EF5350',
  '#FFA726',
  '#FFEE58',
  '#66BB6A',
  '#42A5F5',
  '#5C6BC0',
  '#7E57C2',
  '#EC407A',
  '#29B6F6',
  '#26C6DA',
  '#9CCC65',
  '#FFCA28',
];

const styles = () => ({
  chart: {
    height: 400,
  },
});

const ChartPie = ({
  data,
  title,
  classes,
  onRefreshClick
}) => {
  const isZero = data.every(v => v.value === 0);
  if (data.length === 0 || isZero) {
    return (
      <NotFoundError
        title={title}
        onRefreshClick={!isZero ? onRefreshClick : undefined}
      />
    );
  }

  return (
    <div>
      <Typography variant="body2">
        {title}
      </Typography>
      <div className={classes.chart}>
        <ResponsivePie
          data={data}
          margin={{
            top: 90,
            right: 90,
            bottom: 40,
            left: 85
          }}
          sortByValue
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          colors={colors}
          colorBy="id"
          radialLabelsSkipAngle={12}
          radialLabelsTextXOffset={3}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={10}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={12}
          radialLabelsLinkStrokeWidth={2}
          radialLabelsLinkColor="inherit"
          slicesLabelsSkipAngle={16}
          slicesLabelsTextColor="#333333"
          animate
          motionStiffness={90}
          motionDamping={15}
          legends={[{
            anchor: 'top-right',
            direction: 'column',
            itemDirection: 'right-to-left',
            translateY: -88,
            translateX: 80,
            itemWidth: 100,
            itemHeight: 11,
            itemsSpacing: 6,
            symbolSize: 12,
            symbolShape: 'circle',
          }]}
        />
      </div>
    </div>
  );
};

ChartPie.propTypes = {
  classes: PropTypes.shape({
    chart: PropTypes.string,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChartPie);
