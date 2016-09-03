import { areas } from '../game/constants';

const getCardWithUpdatedVisibility = (card, reveal = true) =>
  ({ ...card, hidden: !reveal });

const revealLastCard = (stack) => {
  if (stack.length === 0) return stack;
  return stack.slice(0, -1).concat([getCardWithUpdatedVisibility(
    ...stack.slice(-1)
  )]);
};

const updateSourceArea = (state, { from: { area, stackNumber, index } }) => {
  let nextAreaState;
  if (area === areas.WASTE) {
    return { ...state, [area]: [] };
  } else {
    nextAreaState = Object.assign([], state[area], {
      [stackNumber]: revealLastCard(
        state[area][stackNumber].slice(0, index)
      ),
    });
  }
  return { ...state, [area]: nextAreaState };
};

const updateTargetArea = (state, { from, to }, originalState) => {
  const { area: source, stackNumber: sourceStackNumber, index } = from;
  const { area, stackNumber } = to;
  const cardsBeingMoved = (source === areas.WASTE) ?
    originalState[source].slice(-1) :
    originalState[source][sourceStackNumber].slice(index);
  const nextAreaState = Object.assign([], state[area], {
    [stackNumber]: [
      ...state[area][stackNumber],
      ...cardsBeingMoved,
    ],
  });
  return { ...state, [area]: nextAreaState };
};

export const moveCards = (state, action) => {
  const updatedState = updateSourceArea(state, action);
  return updateTargetArea(updatedState, action, state);
};

export const newWaste = (state) => {
  const waste = state[areas.WASTE];
  const stock = state[areas.STOCK];
  const nextWaste = stock.slice(0, 1);
  nextWaste[0] = { ...nextWaste[0], hidden: false };
  const nextUltimateStockCard = waste.length > 0 ? { ...waste[0], hidden: true } : [];
  const nextStock = [...stock.slice(1)].concat(nextUltimateStockCard);
  return { ...state, [areas.WASTE]: nextWaste, [areas.STOCK]: nextStock };
};
