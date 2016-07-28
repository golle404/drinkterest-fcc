import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const HeaderNavAuth = ({user, logoutHandler}) => {
  return (
    <ul className="header-nav">
      <li><Link activeClassName="active" to="/submissions/latest">Latest</Link></li>
      <li><Link activeClassName="active" to="/submissions/popular">Popular</Link></li>
      <li><Link activeClassName="active" to={"/submissions/latest/" + user.username}>Your Drinks</Link></li>
      <li><Link activeClassName="active" to="/profile">Profile</Link></li>
      <li><Link activeClassName="active" to="/submission/add">Add Drink</Link></li>
      <li><a href="#" onClick={logoutHandler}>Logout</a></li>
    </ul>
  )
}

HeaderNavAuth.propTypes = {
  user: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired
}

export default HeaderNavAuth;
