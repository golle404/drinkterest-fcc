import React, { PropTypes } from 'react';
import AuthHeaderLogin from './AuthHeaderLogin';
import AuthHeaderRegister from './AuthHeaderRegister';
import AuthForm from './AuthForm';

const AuthenticationPage = ({params}) => {
  const register = params.method === "register";
  return (
    <div className="form-container">
      {register ? <AuthHeaderRegister /> : <AuthHeaderLogin />}
      <AuthForm register={register}/>
    </div>
  )
}

export default AuthenticationPage;
