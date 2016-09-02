/* eslint no-undef: "error" */
/* global describe it expect beforeEach */

import deepFreeze from 'deep-freeze';
import { areas } from '../../src/game/constants';
import reducer from '../../src/reducers/index';

describe('main reducer', () => {
  it('should return a new game state as the initial state', () => {
    expect(reducer(undefined)).to.contain.all.keys(
      ['stock', 'foundations', 'waste', 'tableaux']
    );
  });
  describe('MOVE_CARDS', () => {
    context('When moving cards from tableau to tableau', () => {
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
      it('handles moving a card to an other tableau', () => {
        const nextState = reducer(state, {
          type: 'MOVE_CARDS',
          from: { area: areas.TABLEAUX, stackNumber: 0, index: 2 },
          to: { area: areas.TABLEAUX, stackNumber: 1 },
        });

        expect(nextState.tableaux[0]).to.have.lengthOf(state.tableaux[0].length - 1);
        expect(nextState.tableaux[1]).to.have.lengthOf(state.tableaux[1].length + 1);
        expect(nextState.tableaux[0]).to.eql([
          { suit: '♣', value: 13, hidden: true },
          { suit: '♣', value: 2, hidden: false },
        ]);
        expect(nextState.tableaux[1]).to.eql([{ suit: '♦', value: 1, hidden: false }]);
      });
      it('handles moving multiple cards to an other tableau', () => {
        const nextState = reducer(state, {
          type: 'MOVE_CARDS',
          from: { area: areas.TABLEAUX, stackNumber: 0, index: 1 },
          to: { area: areas.TABLEAUX, stackNumber: 1 },
        });

        expect(nextState.tableaux[0]).to.have.lengthOf(state.tableaux[0].length - 2);
        expect(nextState.tableaux[1]).to.have.lengthOf(state.tableaux[1].length + 2);
        expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 13, hidden: false }]);
        expect(nextState.tableaux[1]).to.eql([
          { suit: '♣', value: 2, hidden: false },
          { suit: '♦', value: 1, hidden: false },
        ]);
      });
      context('when moving all the cards of a tableau', () => {
        it('empties the source tableau', () => {
          const nextState = reducer(state, {
            type: 'MOVE_CARDS',
            from: { area: areas.TABLEAUX, stackNumber: 0, index: 0 },
            to: { area: areas.TABLEAUX, stackNumber: 1 },
          });
          expect(nextState.tableaux[0]).to.have.lengthOf(state.tableaux[0].length - 3);
          expect(nextState.tableaux[1]).to.have.lengthOf(state.tableaux[1].length + 3);
          expect(nextState.tableaux[0]).to.eql([]);
        });
      });
    });
    context('When moving a tableau card to a foundation', () => {
      let state;
      beforeEach(() => {
        state = deepFreeze({
          tableaux: [
            [{ suit: '♣', value: 2, hidden: true }, { suit: '♦', value: 1, hidden: false }],
          ],
          foundations: [[], [], [], []],
        });
      });
      it('updates both source tableau and foundation', () => {
        const nextState = reducer(state, {
          type: 'MOVE_CARDS',
          from: { area: areas.TABLEAUX, stackNumber: 0, index: 1 },
          to: { area: areas.FOUNDATIONS, stackNumber: 3 },
        });
        expect(nextState.tableaux[0]).to.eql([{ suit: '♣', value: 2, hidden: false }]);
        expect(nextState.foundations[3]).to.eql([{ suit: '♦', value: 1, hidden: false }]);
      });
    });
    describe('When moving a card from the waste to a tableau', () => {
      let state, nextState;
      beforeEach(() => {
        state = deepFreeze({
          waste: [{ suit: '♠', value: 5 }],
          tableaux: [[]],
        });
        nextState = reducer(state, {
          type: 'MOVE_CARDS',
          from: { area: areas.WASTE },
          to: { area: areas.TABLEAUX, stackNumber: 0 },
        });
      });
      it('empties the waste', () => {
        expect(nextState.waste).to.be.empty;
      });
      it('adds a new card to the tableaux', () => {
        expect(nextState.tableaux).to.eql([[{ suit: '♠', value: 5 }]]);
      });
    });
    describe('When moving a card from the waste to a foundation', () => {
      let state, nextState;
      beforeEach(() => {
        state = deepFreeze({
          waste: [{ suit: '♠', value: 5 }],
          foundations: [[], [], [], []],
        });
        nextState = reducer(state, {
          type: 'MOVE_CARDS',
          from: { area: areas.WASTE },
          to: { area: areas.FOUNDATIONS, stackNumber: 2 },
        });
      });
      it('empties the waste', () => {
        expect(nextState.waste).to.be.empty;
      });
      it('adds a new card to the foundations', () => {
        expect(nextState.foundations[2]).to.eql([{ suit: '♠', value: 5 }]);
      });
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
});
