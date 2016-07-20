import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const Home = (props) => {
  return (
    <div className="home">
      <ul>
        <li><Link to="/auth/login">Login</Link></li>
        <li><Link to="/auth/register">Register</Link></li>
        <li><Link to="/submissions">Drinks</Link></li>
        <li><Link to="/submissions/popular">Drinks/Popular</Link></li>
        <li><Link to="/submissions/popular/golle">Drinks/Popular/Golle</Link></li>
        <li><Link to="/submissions/recent/admin">Drinks/Recent/Admin</Link></li>
      </ul>
    </div>
  )
}

export default Home;
