import { range, product } from './sets';

export const getNewDeck = () => product(
  range(1, 13),
  ['♠', '♥', '♦', '♣']
).map(
  ([value, suit]) => ({ value, suit })
);

// https://bost.ocks.org/mike/shuffle/
export const shuffle = (array) => {
  let m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};
