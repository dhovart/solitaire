export const range = (x, y, included = true) =>
  Array.from(Array((y - x) + Number(included)), (_, i) => i + x);

export const product = (...sets) => {};
