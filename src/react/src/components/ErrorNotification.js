import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const ErrorNotification = (props) => {
  /* eslint-disable indent */
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

  return (
    <div>
      {(message === 'Not Found')
        ? <Typography
          color="secondary"
          noWrap
          paragraph
          variant="button">
          User not found<Button color="primary" href="./">Go home</Button>
        </Typography>
        : <Typography
          color="primary"
          noWrap
          paragraph
          variant="title">
          Oops! Something went wrong. Please, try again later
        </Typography>
      }
    </div>
  );
};

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
  documentation_url: PropTypes.string,
  errors: PropTypes.arrayOf('object'),
};

ErrorNotification.defaultProps = {
  documentation_url: '',
  errors: null,
};

export default ErrorNotification;
