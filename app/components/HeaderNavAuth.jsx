import React from 'react';
import {Link} from 'react-router';

const HeaderNavAuth = (props) => {
  return (
    <ul className="header-nav">
      <li><Link activeClassName="active" to={"/submissions/latest/" + props.user.username}>Your Drinks</Link></li>
      <li><Link activeClassName="active" to="/profile">Profile</Link></li>
      <li><Link activeClassName="active" to="/submission/add">Add Drink</Link></li>
      <li><Link activeClassName="active" to="/submissions/popular">Logout</Link></li>
    </ul>
  )
}

export default HeaderNavAuth;
