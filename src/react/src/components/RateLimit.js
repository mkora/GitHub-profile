import React from 'react';
import PropTypes from 'prop-types';

const RateLimit = props => (
  <div style={{ clear: 'both' }}>
    <p>Rate Limit: {props.limit}</p>
    <p>Remaining: {props.remaining}</p>
  </div>
);

RateLimit.propTypes = {
  limit: PropTypes.string.isRequired,
  remaining: PropTypes.string.isRequired,
};

export default RateLimit;
