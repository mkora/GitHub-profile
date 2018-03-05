import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

import NotFoundError from './NotFoundError';

const NotificationError = (props) => {
  /* eslint-disable indent */
  /* eslint-disable react/jsx-indent-props */
  /* eslint-disable react/jsx-indent */
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
      <NotFoundError
        title="User"
        onRefreshClick={props.onRefreshClick}
      />
    );
  }
  // @todo add for rate limits 403 Forbidden
  // eq "message": "API rate limit exceeded for xxx.xxx.xxx.xxx ...etc...",
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
  onRefreshClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  documentation_url: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.object),
};

NotificationError.defaultProps = {
  documentation_url: '',
  errors: null,
};

export default NotificationError;
