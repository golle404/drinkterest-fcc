import React from 'react';
import {Link} from 'react-router';

const AuthHeaderLogin = () => {
  return (
    <div className="form-header">
      <div className="form-header-tab">
        <span>Login</span>
      </div>
      <div className="form-header-tab">
        <Link to="/auth/register">Register</Link>
      </div>
    </div>
  );
};

export default AuthHeaderLogin;
