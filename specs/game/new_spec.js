/* eslint no-undef: "error" */
/* global describe it expect */

import getNewState from '../../src/game/new';

const state = getNewState();

describe('getNewState', () => {
  it('should return an object with keys: stock, foundations, waste, tableaux', () => {
    expect(state).to.contain.all.keys(['stock', 'foundations', 'waste', 'tableaux']);
  });
  describe('stock', () => {
    it('should have 24 cards', () => {
      expect(state.stock).to.have.lengthOf(24);
    });
  });
  describe('foundations', () => {
    it('should contain 4 empty arrays', () => {
      const hasEmptyEntries = state.foundations
        .map(n => n.length === 0)
        .reduce((a, b) => a && b);
      expect(state.foundations).to.have.lengthOf(4);
      expect(hasEmptyEntries).to.be.true;
    });
  });
  describe('waste', () => {
    it('should be an empty array', () => {
      expect(state.waste).to.be.empty;
    });
  });
  describe('tableaux', () => {
    it('should contain 7 arrays', () => {
      expect(state.tableaux).to.have.a.lengthOf(7);
    });
    it('has each tableau with one card more than the previous, starting from 1', () => {
      const succedingLengths = state.tableaux
        .map((t, i) => t.length === i + 1)
        .reduce((a, b) => a && b);
      expect(succedingLengths).to.be.true;
    });
    it('only have last card shown', () => {
      const tableauxWithLastCardShown = state.tableaux.map((tableau, i) => tableau.reduce(
        (bool, card, j) => ((i === j) === !card.hidden) && bool,
        true
      ));
      const allHaveLastCardShown = tableauxWithLastCardShown.reduce((b1, b2) =>
          b1 && b2,
        true
      );
      expect(allHaveLastCardShown).to.be.true;
    });
  });
});
