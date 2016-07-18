import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const Header = (props) => {
  return (
    <header>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/auth/login">Login</Link>
      {" | "}
      <Link to="/add_drink">Add Drink</Link>
    </header>
  )
}

export default Header;
