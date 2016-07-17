import { Schema, arrayOf, normalize } from 'normalizr';

const drinkSchema = new Schema("data", { idAttribute: '_id' });

const normalizeDrinks = (drinks) => {
  return normalize(drinks, arrayOf(drinkSchema)).entities.data || {}
}

export default normalizeDrinks;
