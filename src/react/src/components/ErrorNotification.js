import React from 'react';
import PropTypes from 'prop-types';

const ErrorNotification = props => (
  <div>
    <p>Oops! Something went wrong</p>
    <p>Reason: {props.message} {props.documentation_url
      ? `(See details: ${props.documentation_url}` : ''}
    </p>
    {props.errors &&
      <p>Info:
        {props.errors.map(v => `${v.code
          ? `${v.code}:` : ''} ${v.resource} ${v.field
          ? `in ${v.field}` : ''}`)}
      </p>
    }
  </div>
);

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
