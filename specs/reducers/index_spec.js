/* eslint no-undef: "error" */
/* global describe it expect */

import deepFreeze from 'deep-freeze';
import reducer from '../../src/reducers/index';

describe('main reducer', () => {
  it('should return a new game state as the initial state', () => {
    expect(reducer(undefined)).to.contain.all.keys(
      ['stock', 'foundations', 'waste', 'tableaux']
    );
  });
});
