import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const Home = (props) => {
  return (
    <div className="home">
      <ul>
        <li><Link to="/auth/login">Login</Link></li>
        <li><Link to="/auth/register">Register</Link></li>
        <li><Link to="/user/admin/recent">User</Link></li>
      </ul>
    </div>
  )
}

export default Home;
