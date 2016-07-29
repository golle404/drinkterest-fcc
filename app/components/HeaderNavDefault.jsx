import React from 'react';
import {Link} from 'react-router';

const HeaderNavDefault = () => {
  return (
    <li className="nav-dropdown">
      <a href="#" className="dropdown-selector">Sign In</a>
      <ul>
        <li><Link activeClassName="active" to="/auth/login">Login</Link></li>
        <li><Link activeClassName="active" to="/auth/register">Register</Link></li>
      </ul>
    </li>
  )
}

export default HeaderNavDefault;
