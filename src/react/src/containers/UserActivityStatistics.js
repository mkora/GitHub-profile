import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import TodayIcon from 'material-ui-icons/Today';
import TimelineIcon from 'material-ui-icons/Timeline';

import ChartLine from '../components/ChartLine';
import ChartCalendar from '../components/ChartCalendar';
import { linedData, calendaredData } from '../utils/chartDataFilters'

const styles = theme => ({
  title: {
    fontSize: '1rem',
    fontWeight: 400
  },
  card: {
    height: '100%',
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardContent: {
    paddingTop: 0,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class UserActivityStatistics extends Component {
  state = {
    isLineChart: true,
  }

  handleSwitchClick = (e) => {
    this.setState((state) => {
      return {
        isLineChart: !state.isLineChart
      };
    });
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={
            <span className={classes.title}>
              Contributions in the last year
            </span>
          }
          action={
            <IconButton
              className={classes.icon}
              aria-label={`Switch to ${this.state.isLineChart
                ? 'chart' : 'calendar'} view`}
              onClick={this.handleSwitchClick}
            >
            {
              this.state.isLineChart &&
                <TodayIcon
                  color="action"
                  titleAccess="Switch to calendar view"
                />
            }
            {
              !this.state.isLineChart &&
                <TimelineIcon
                  color="action"
                  titleAccess="Switch to activity chart"
                />
            }
            </IconButton>
          }
        />
        <CardContent className={classes.cardContent}>
          {
            this.state.isLineChart &&
            <ChartLine
              title="Contributions"
              data={linedData(data)}
              onRefreshClick={this.props.onRefreshClick}
            />
          }
          {
            (!this.state.isLineChart) &&
            <ChartCalendar
              title="Contributions"
              data={calendaredData(data)}
            />
          }
        </CardContent>
      </Card>
    );
  }
};

UserActivityStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onRefreshClick: PropTypes.func.isRequired,  
};

export default withStyles(styles)(UserActivityStatistics);
