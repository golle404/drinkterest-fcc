import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const Home = (props) => {
  return (
    <div>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/user/admin/recent">User</Link></li>
      </ul>
    </div>
  )
}

export default Home;
