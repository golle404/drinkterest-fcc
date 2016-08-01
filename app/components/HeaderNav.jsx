import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import HeaderNavDefault from './HeaderNavDefault';
import HeaderNavAuth from './HeaderNavAuth';

const HeaderNav = ({user, logoutHandler}) => {
  return (
    <ul className="header-nav">
      <li><Link activeClassName="active" to="/submissions/latest">Home</Link></li>
      <li><Link activeClassName="active" to="/submissions/popular">About</Link></li>
      {user.auth ? <HeaderNavAuth user={user} logoutHandler={logoutHandler}/> : <HeaderNavDefault/>}
    </ul>
  )
}

/*HeaderNav.propTypes = {
  user: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired
}*/

export default HeaderNav;
