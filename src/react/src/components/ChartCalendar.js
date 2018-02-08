import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveCalendar } from '@nivo/calendar';

const ChartCalendar = (props) => {
  const { data } = props; 
  const fromDate = data[0].day;
  const toDate = data[data.length - 1].day;

  return (
    <div style={{ height: 400 }}>
      <ResponsiveCalendar
        data={data}
        from={fromDate}
        to={toDate}
        emptyColor="#eeeeee"
        colors={[
          '#97e3d5',
          '#61cdbb',
          '#e8c1a0',
          '#faa0a0',
          '#f47560'
        ]}
        margin={{
          top: 100,
          right: 30,
          bottom: 60,
          left: 30
        }}
        yearSpacing={40}
        yearLegendOffset={10}
        monthBorderColor="#ffffff"
        monthLegendOffset={10}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: 36,
            itemCount: 5,
            itemWidth: 30,
            itemHeight: 30,
            itemDirection: 'top-to-bottom'
          }
        ]}
      />
    </div>
  );
};

ChartCalendar.propTypes = {

};

export default ChartCalendar;
