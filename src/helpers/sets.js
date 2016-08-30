export const range = (x, y, included = true) =>
  Array.from(Array((y - x) + Number(included)), (_, i) => i + x);

const flatten = (array) =>
  array.reduce((a, b) => a.concat([...b]), []);

export const product = (...sets) => {
  if (sets.length < 2) {
    throw new TypeError('`product` has a minimum arity of 2');
  }
  return sets.reduce((a, b) =>
    flatten(a.map(x => b.map(y => x.concat([y])))),
    [[]]
  );
};
