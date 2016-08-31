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
});
