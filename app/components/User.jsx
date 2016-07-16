import React, { PropTypes } from 'react';

const User = (props) => {
  return (
    <div>User {props.params.username}</div>
  )
}

export default User;
