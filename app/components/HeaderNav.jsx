import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import HeaderNavDefault from './HeaderNavDefault.jsx';
import HeaderNavAuth from './HeaderNavAuth.jsx';

const HeaderNav = ({user, logoutHandler}) => {
  return (
    <ul className="header-nav">
      <li><Link activeClassName="active" to="/" onlyActiveOnIndex>Home</Link></li>
      <li><Link activeClassName="active" to="/about">About</Link></li>
      {user.auth ? <HeaderNavAuth user={user} logoutHandler={logoutHandler}/> : <HeaderNavDefault/>}
    </ul>
  );
};

HeaderNav.propTypes = {
  user: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired
};

export default HeaderNav;
