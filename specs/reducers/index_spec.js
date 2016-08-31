/* eslint no-undef: "error" */
/* global describe it expect beforeEach */

import deepFreeze from 'deep-freeze';
import reducer from '../../src/reducers/index';

describe('main reducer', () => {
  it('should return a new game state as the initial state', () => {
    expect(reducer(undefined)).to.contain.all.keys(
      ['stock', 'foundations', 'waste', 'tableaux']
    );
  });
  describe('MOVE_TABLEAU_CARDS', () => {
    let state;
    beforeEach(() => {
      state = deepFreeze({
        tableaux: [
          [
            { suit: '♣', value: 13, hidden: true },
            { suit: '♣', value: 2, hidden: false },
            { suit: '♦', value: 1, hidden: false },
          ],
          [],
        ],
      });
    });
    it('handles stacking a card on top of another card in an other tableau', () => {
      const nextState = reducer(state, {
        type: 'MOVE_TABLEAU_CARDS',
        from: 0,
        to: 1,
        stackPos: 2,
      });

      expect(nextState.tableaux[0]).to.eql([
        { suit: '♣', value: 13, hidden: true },
        { suit: '♣', value: 2, hidden: false },
      ]);
      expect(nextState.tableaux[1]).to.eql([{ suit: '♦', value: 1, hidden: false }]);
    });
    it('handles stacking multiple cards on top of another card in an other tableau', () => {
      const nextState = reducer(state, {
        type: 'MOVE_TABLEAU_CARDS',
        from: 0,
        to: 1,
        stackPos: 1,
      });

      expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 13, hidden: false }]);
      expect(nextState.tableaux[1]).to.eql([
        { suit: '♣', value: 2, hidden: false },
        { suit: '♦', value: 1, hidden: false },
      ]);
    });
  });
  describe('MOVE_TABLEAU_CARD_TO_FOUNDATION', () => {
    let state;
    beforeEach(() => {
      state = deepFreeze({
        tableaux: [
          [{ suit: '♣', value: 2, hidden: true }, { suit: '♦', value: 1, hidden: false }],
        ],
        foundations: [[], [], [], []],
      });
    });
    it('handles moving a card from a tableau to a foundation', () => {
      const nextState = reducer(state, {
        type: 'MOVE_TABLEAU_CARD_TO_FOUNDATION',
        from: 0,
        to: 3,
      });
      expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 2, hidden: false }]);
      expect(nextState.foundations[3]).to.eql([{ suit: '♦', value: 1, hidden: false }]);
    });
  });
  describe('NEW_WASTE_CARD', () => {
    let state;
    beforeEach(() => {
      state = deepFreeze({
        stock: [
          { suit: '♣', value: 13, hidden: true },
          { suit: '♥', value: 4, hidden: true },
        ],
        waste: [
          { suit: '♠', value: 5, hidden: false },
        ],
      });
    });
    it('moves the top card of the stock pile to the waste and reveal it', () => {
      const nextState = reducer(state, { type: 'NEW_WASTE_CARD' });
      expect(nextState.waste).to.eql([{ suit: '♣', value: 13, hidden: false }]);
    });
    it('moves the current waste card to the end of the stock pile and hide it', () => {
      const nextState = reducer(state, { type: 'NEW_WASTE_CARD' });
      expect(nextState.stock).to.eql([
        { suit: '♥', value: 4, hidden: true },
        { suit: '♠', value: 5, hidden: true },
      ]);
    });
  });
  describe('MOVE_WASTE_CARD_TO_TABLEAU', () => {
    let state, nextState;
    beforeEach(() => {
      state = deepFreeze({
        waste: [{ suit: '♠', value: 5 }],
        tableaux: [[]],
      });
      nextState = reducer(state, { type: 'MOVE_WASTE_CARD_TO_TABLEAU', to: 0 });
    });
    it('empties the waste', () => {
      expect(nextState.waste).to.be.empty;
    });
    it('adds a new card to the tableaux', () => {
      expect(nextState.tableaux).to.eql([[{ suit: '♠', value: 5 }]]);
    });
  });
  describe('MOVE_WASTE_CARD_TO_FOUNDATION', () => {
    let state, nextState;
    beforeEach(() => {
      state = deepFreeze({
        waste: [{ suit: '♠', value: 5 }],
        foundations: [[], [], [], []],
      });
      nextState = reducer(state, { type: 'MOVE_WASTE_CARD_TO_FOUNDATION', to: 2 });
    });
    it('empties the waste', () => {
      expect(nextState.waste).to.be.empty;
    });
    it('adds a new card to the foundations', () => {
      expect(nextState.foundations[2]).to.eql([{ suit: '♠', value: 5 }]);
    });
  });
});
