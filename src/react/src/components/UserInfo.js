import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = (props) => {
  const isPlaced = props.company || props.location;
  return (
    <div>
      <div style={{ float: 'left', width: '50%' }}>
        <img
          src={props.avatarUrl}
          alt={`Profile of ${props.username}`}
          height="150"
          width="150"
        />
      </div>
      <div style={{ float: 'right', width: '50%' }}>
        <p>{props.username} {props.realname ? `(${props.realname})` : ''}</p>
        <p><a href={props.profileUrl}>GitHub</a></p>
        { isPlaced &&
          <p>
            {props.company ? `Works at '${props.company}'` : ''}
            {props.company && props.location ? ',' : ''}
            {props.location ? props.location : ''}
          </p>
        }
        <p>Member Since: {props.memberSince}</p>
        <p>Public Repos: {props.reposNumber}</p>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
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

export default UserInfo;
