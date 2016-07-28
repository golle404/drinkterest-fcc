import React from 'react';
import {Link} from 'react-router';

const HeaderNavDefault = () => {
  return (
    <ul className="header-nav">
      <li><Link activeClassName="active" to="/submissions/latest">Latest</Link></li>
      <li><Link activeClassName="active" to="/submissions/popular">Popular</Link></li>
      <li><Link activeClassName="active" to="/auth/login">Login</Link></li>
      <li><Link activeClassName="active" to="/auth/register">Register</Link></li>
    </ul>
  )
}

export default HeaderNavDefault;
