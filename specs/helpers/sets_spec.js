/* eslint no-undef: "error" */
/* global describe it expect */

import { range, product } from '../../src/helpers/sets';

describe('range', () => {
  it('should be called with at least the x and y arguments defined', () => {
    expect(range.bind(null)).to.throw();
    expect(range.bind(1, null)).to.throw();
    expect(range.bind(null, 5)).to.throw();
  });
  it('should return an array of successive numbers', () => {
    const start = 5;
    const succeding = range(5, 10).map((n, i) => n === start + i).reduce((a, b) => a && b);
    expect(succeding).to.be.true;
  });
  it('includes the right endpoint by default', () => {
    const start = -5;
    const end = 20;
    expect(range(start, end)).to.have.lengthOf((end - start) + 1);
  });
  it('excludes the right endpoint when specified', () => {
    const start = 3;
    const end = 8;
    expect(range(start, end, false)).to.have.lengthOf(end - start);
  });
  it('doesn’t work with invalid ranges', () => {
    const start = 8;
    const end = 3;
    expect(range.bind(start, end)).to.throw();
    expect(range.bind(start, start)).to.throw();
    expect(range.bind(end, end)).to.throw();
  });
});
describe('product', () => {
  it('has a minimum arity of 2', () => {
    expect(product.bind([])).to.throw();
    expect(product.bind(null)).to.throw();
  });
  it('only accepts arrays as arguments', () => {
    expect(product.bind(1, 2)).to.throw();
    expect(product.bind('a', 'b', 'c')).to.throw();
  });
  it('returns an array whose length is equal to the product of the length of each array', () => {
    expect(product([1, 2], ['a', 'b', 'c'])).to.have.lengthOf(6);
  });
  it('returns the cartesian product of each argument', () => {
    const first = [1, 2];
    const second = ['a', 'b', 'c'];
    const result = product(first, second);
    expect(result).to.eql([[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c']]);
  });
});
