import React, { PropTypes } from 'react';
import AuthHeaderLogin from './AuthHeaderLogin.jsx';
import AuthHeaderRegister from './AuthHeaderRegister.jsx';
import AuthForm from './AuthForm.jsx';
import AuthSocial from './AuthSocial.jsx';

const AuthenticationPage = ({params}) => {
  const register = params.method === "register";
  return (
    <div className="form-container">
      {register ? <AuthHeaderRegister /> : <AuthHeaderLogin />}
      <AuthForm register={register}/>
      <AuthSocial/>
    </div>
  );
};

AuthenticationPage.propTypes = {
  params: PropTypes.object.isRequired
};

export default AuthenticationPage;
