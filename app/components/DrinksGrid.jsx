import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const DrinksGrid = ({data, idx, userId}) => {
  return (
    <ul>
      {idx.map((id) => {
        const drink = data[id]
        return (
          <li key={id}>
            <div>{drink.numLikes}</div>
            <div>{drink.name}</div>
            <Link to={"/drinks/recent/" + drink.submitterName}>{drink.submitterName}</Link>
            {!(drink.submitterId === userId) || <Link to={"/drink/edit/" + id}>Edit</Link>}
          </li>
        )
      })}
    </ul>
  )
}

export default DrinksGrid;
