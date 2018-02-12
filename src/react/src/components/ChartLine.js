import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

const ChartLine = (props) => {
  const { data, title } = props;
  if (data.length === 0) {
    return (
      <div>{title} data not found. Please, try again later.</div>
    );
  }

  return (
    <div style={{ height: 250 }}>
      <ResponsiveLine
        data={[
        {
          id: 'commits',
          data: props.data
        }]}
        margin={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 60
        }}
        minY="0"
        curve="cardinal"
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
        enableDots={false}
        enableArea={true}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[]}
      />
    </div>
  );
};

ChartLine.propTypes = {

};

export default ChartLine;
