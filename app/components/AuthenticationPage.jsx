import React, { PropTypes } from 'react';
import AuthForm from './AuthForm';

const AuthenticationPage = (props) => {
  return (
    <div>
      <AuthForm register={props.params.method === "register"}/>
    </div>
  )
}

export default AuthenticationPage;
