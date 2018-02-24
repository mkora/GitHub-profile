import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { withStyles } from 'material-ui/styles';

import { Card, CardHeader, CardContent } from 'material-ui';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import BusinessIcon from 'material-ui-icons/Business';
import EventNoteIcon from 'material-ui-icons/EventNote';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import StorageIcon from 'material-ui-icons/Storage';
import GitHubIcon from '../icons/GitHubIcon';

const styles = theme => ({
  card: {
    height: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const UserInfo = (props) => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            alt={`Profile of ${props.username}`}
            src={props.avatarUrl}
            className={classes.avatar}
          />
        }
        title={props.username}
        subheader={props.realname}
        action={
          <IconButton
            className={classes.icon}
            aria-label="View prifile on GitHub"
            target="_blank"
            href={props.profileUrl}
          >
            <GitHubIcon
              color="action"
              titleAccess="GitHub profile"
            />
          </IconButton>
        }
      />
      <CardContent>
        <Typography paragraph>
          <EventNoteIcon
            className={classes.icon}
            color="primary"
            titleAccess="Member Since"
          />
          Joined {moment(props.memberSince).format('dddd, MMMM Do YYYY')}
        </Typography>

        <Typography paragraph>
          <StorageIcon
            className={classes.icon}
            color="primary"
            titleAccess="Public Repos"
          />
          Created {props.reposNumber} repos
        </Typography>

        { props.company &&
          <Typography paragraph>
            <BusinessIcon
              className={classes.icon}
              color="primary"
              titleAccess="Works at"
            />
            {props.company}
          </Typography>
        }

        { props.location &&
          <Typography paragraph>
            <LocationOnIcon
              className={classes.icon}
              color="primary"
              titleAccess="Location"
            />
            {props.location}
          </Typography>
        }
      </CardContent>
    </Card>
  );
};

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  realname: PropTypes.string,
  profileUrl: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  memberSince: PropTypes.string.isRequired,
  company: PropTypes.string,
  location: PropTypes.string,
  reposNumber: PropTypes.number.isRequired,
};

UserInfo.defaultProps = {
  realname: '',
  avatarUrl: '',
  company: '',
  location: '',
};

export default withStyles(styles)(UserInfo);
