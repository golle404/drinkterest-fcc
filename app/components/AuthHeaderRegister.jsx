import React from 'react';
import {Link} from 'react-router';

const AuthHeaderRegister = () => {
  return (
    <div className="form-header">
      <div className="form-header-tab">
        <Link to="/auth/login">Login</Link>
      </div>
      <div className="form-header-tab">
        <span>Register</span>
      </div>
    </div>
  );
};

export default AuthHeaderRegister;
