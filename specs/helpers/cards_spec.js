/* eslint no-undef: "error" */
/* global describe it expect */

import { getNewDeck } from '../../src/helpers/deck';

const deck = getNewDeck();
describe('getNewDeck', () => {
  it('has a count of 52', () => {
    expect(deck).to.have.a.lengthOf(52);
  });
  it('has 13 values by suit', () => {
    const spades = deck.filter(card => card.suit === '♠');
    const hearts = deck.filter(card => card.suit === '♥');
    const diamonds = deck.filter(card => card.suit === '♦');
    const clubs = deck.filter(card => card.suit === '♣');
    expect(spades).to.have.lengthOf(13);
    expect(hearts).to.have.lengthOf(13);
    expect(diamonds).to.have.lengthOf(13);
    expect(clubs).to.have.lengthOf(13);
  });
});
