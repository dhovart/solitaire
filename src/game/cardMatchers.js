import { values } from './constants';
import { isBlack, isRed } from '../helpers/deck';

const combineComparators = (card, ...comparators) => {
  const boundComparators = comparators.map(c => c(card));
  return (target) => boundComparators.reduce((prev, cur) => prev(target) && cur(target));
};

const isSuccessor = (comparedAgainst) => (card) =>
  comparedAgainst.value === card.value + 1;

const isPredecessor = (comparedAgainst) => (card) =>
  comparedAgainst.value === card.value - 1;

const isOfOppositeColor = (comparedAgainst) => (card) =>
  (isBlack(comparedAgainst) ? isRed(card) : isBlack(card));

const isSameSuit = (comparedAgainst) => (card) =>
  comparedAgainst.suit === card.suit;

export const tableauComparator = (card) => combineComparators(card, isOfOppositeColor, isSuccessor);
export const foundationComparator = (card) => combineComparators(card, isSameSuit, isPredecessor);

export const allowOnEmptyTableau = (card) => card.value === values.KING;
export const allowOnEmptyFoundation = (card) => card.value === values.ACE;
