import React, { PropTypes } from 'react';
import DrinkItem from './DrinkItem';

const DrinksGrid = ({data, idx, userId, deleteDrink}) => {
  return (
    <ul>
      {idx.map((id) => {
        const drink = data[id]
        return (
          <DrinkItem key={id} drink={drink}/>
        )
      })}
    </ul>
  )
}

export default DrinksGrid;
