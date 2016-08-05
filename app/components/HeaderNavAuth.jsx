import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const HeaderNavAuth = ({user, logoutHandler}) => {
  return (
    <li className="nav-dropdown">
      <a href="#" className="dropdown-selector">Dashboard</a>
      <ul>
        <li><Link activeClassName="active" to={"/user/" + user.username}>Your Drinks</Link></li>
        <li><Link activeClassName="active" to="/profile">Profile</Link></li>
        <li><Link activeClassName="active" to="/submission/add">Add Drink</Link></li>
        <li><a href="#" onClick={logoutHandler}>Logout</a></li>
      </ul>
    </li>
  );
};

HeaderNavAuth.propTypes = {
  user: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired
};

export default HeaderNavAuth;
