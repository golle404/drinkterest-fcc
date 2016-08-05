import React from 'react';

const AuthSocial = () => {
  return (
    <div className="form-footer center-align">
      <hr/>
      <h4>Or Sign Up with</h4>
      <a href="/auth/twitter" className="btn btn-accent btn-auth auth-twitter">twitter</a>
      <a href="/auth/github" className="btn btn-accent btn-auth auth-github">github</a>
    </div>
  );
};

export default AuthSocial;
