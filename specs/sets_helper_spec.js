import { range } from '../src/helpers/sets';

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
  it('includes right endpoint by default', () => {
    const start = -5;
    const end = 20;
    expect(range(start, end).length).to.equal((end - start) + 1);
  });
  it('excludes right endpoint when specified', () => {
    const start = 3;
    const end = 8;
    expect(range(start, end, false).length).to.equal(end - start);
  it('doesn’t work with invalid ranges', () => {
    const start = 8;
    const end = 3;
    expect(range.bind(start, end)).to.throw();
    expect(range.bind(start, start)).to.throw();
    expect(range.bind(start, start, true)).to.throw();
  });
});

describe('product', () => {
});
