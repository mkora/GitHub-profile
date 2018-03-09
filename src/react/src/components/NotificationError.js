import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

import NotFoundError from './NotFoundError';

const NotificationError = (props) => {
  const { message } = props;
  const text = `Reason: ${message}
    ${(props.documentation_url)
      ? `(See details: ${props.documentation_url}` : ''}
    ${props.errors
      ? `Info:
        ${props.errors.map(v => `${v.code
          ? `${v.code}:` : ''} ${v.resource} ${v.field
          ? `in ${v.field}` : ''}`)}`
    : ''}`;
  console.log(text);

  if (message === 'Not Found') {
    return (
      <div>
        <NotFoundError
          title="User"
          onRefreshClick={props.onRefreshClick}
        />
        <Typography
          color="textSecondary"
          variant="subheading"
        >
          Please, press the Go Back button
        </Typography>
      </div>
    );
  }
  if (message.includes('rate limit exceeded')) {
    return (
      <div>
        <Typography
          color="textSecondary"
          variant="subheading"
        >
          Rate limit exceeded. Please return later
        </Typography>
      </div>
    );
  }

  return (
    <Typography
      color="primary"
      noWrap
      paragraph
      variant="title"
    >
      Oops! Something went wrong. Please, try again later
    </Typography>
  );
};

NotificationError.propTypes = {
  message: PropTypes.string.isRequired,
  documentation_url: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.object),
  onRefreshClick: PropTypes.func,
};

NotificationError.defaultProps = {
  onRefreshClick: undefined,
  documentation_url: '',
  errors: null,
};

export default NotificationError;
