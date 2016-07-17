import React, { PropTypes } from 'react';
import {Link} from 'react-router';

const DrinksGrid = (props) => {
  return (
    <ul>
      {props.data.entrySeq().map((drink) => {
        return (
          <li key={drink[0]}>
            <div>{drink[1].get("name")}</div>
            <div>{drink[1].get("numLikes")}</div>
            <Link to={"/drinks/recent/" + drink[1].get("submitterName")}>{drink[1].get("submitterName")}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default DrinksGrid;
