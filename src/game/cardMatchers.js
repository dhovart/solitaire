import flow from 'lodash.flow';
import { values } from './constants';
import { isBlack, isRed } from '../helpers/deck';

const combineComparators = (card, ...comparators) => (target) =>
    comparators.reduce((prev, cur) =>
      prev(card)(target) && cur(card)(target));

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
