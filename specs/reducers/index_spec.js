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
          [{ suit: '♣', value: 2 }, { suit: '♦', value: 1 }],
          [],
        ],
      });
    });
    it('handles stacking a card on top of another card in an other tableau', () => {
      const nextState = reducer(state, {
        type: 'MOVE_TABLEAU_CARDS',
        from: 0,
        to: 1,
        stackPos: 1,
      });
      expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 2 }]);
      expect(nextState.tableaux[1]).to.eql([{ suit: '♦', value: 1 }]);
    });
    it('handles stacking multiple cards on top of another card in an other tableau', () => {
      const nextState = reducer(state, {
        type: 'MOVE_TABLEAU_CARDS',
        from: 0,
        to: 1,
        stackPos: 0,
      });
      expect(nextState.tableaux[0]).to.be.empty;
      expect(nextState.tableaux[1]).to.eql([
        { suit: '♣', value: 2 },
        { suit: '♦', value: 1 },
      ]);
    });
  });
  describe('MOVE_TABLEAU_CARD_TO_FOUNDATION', () => {
    let state;
    beforeEach(() => {
      state = deepFreeze({
        tableaux: [
          [{ suit: '♣', value: 2 }, { suit: '♦', value: 1 }],
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
      expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 2 }]);
      expect(nextState.foundations[3]).to.eql([{ suit: '♦', value: 1 }]);
    });
  });
  describe('NEW_WASTE_CARD', () => {
    let state;
    beforeEach(() => {
      state = deepFreeze({
        stock: [{ suit: '♣', value: 13 }, { suit: '♥', value: 4 }],
        waste: [{ suit: '♠', value: 5 }],
      });
    });
    it('moves the top card of the stock pile to the waste', () => {
      const nextState = reducer(state, { type: 'NEW_WASTE_CARD' });
      expect(nextState.waste).to.eql([{ suit: '♣', value: 13 }]);
    });
    it('moves the current waste card to the end of the stock pile', () => {
      const nextState = reducer(state, { type: 'NEW_WASTE_CARD' });
      expect(nextState.stock).to.eql([
        { suit: '♥', value: 4 },
        { suit: '♠', value: 5 },
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
});
