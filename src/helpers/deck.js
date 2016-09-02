import { range, product } from './sets';

const suitValue = (suit) =>
  (0x10 * (0xA + ['♠', '♥', '♦', '♣'].indexOf(suit)));

const getCodePointFor = (suit, value) => // (skip knight)
  String.fromCodePoint(
    0x1F000 + suitValue(suit) + ((value >= 12) ? ++value : value)
  );

export const getNewDeck = () => product(
  range(1, 13),
  ['♠', '♥', '♦', '♣']
).map(
  ([value, suit]) => ({
    value,
    suit,
    hidden: true,
    symbol: getCodePointFor(suit, value),
  })
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

export const isRed = (card) => ['♠', '♣'].includes(card.suit);
export const isBlack = (card) => ['♠', '♣'].includes(card.suit);
