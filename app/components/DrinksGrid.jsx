import React, { PropTypes } from 'react';
import DrinkItem from './DrinkItem';

const DrinksGrid = ({data, idx, userId, deleteDrink}) => {
  return (
    <ul>
      {idx.map((id) => {
        const submission = data[id]
        return (
          <DrinkItem key={id} submission={submission}/>
        )
      })}
    </ul>
  )
}

export default DrinksGrid;
