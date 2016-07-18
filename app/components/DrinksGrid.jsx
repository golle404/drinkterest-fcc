import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const DrinksGrid = ({data, idx}) => {
  return (
    <ul>
      {idx.map((id) => {
        const drink = data[id]
        return (
          <li key={id}>
            <div>{drink.numLikes}</div>
            <div>{drink.name}</div>
            <Link to={"/drinks/recent/" + drink.submitterName}>Recent</Link>
            <Link to={"/drinks/popular/" + drink.submitterName}>popular</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default DrinksGrid;
