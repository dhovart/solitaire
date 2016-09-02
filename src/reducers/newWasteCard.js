import { areas } from '../game/constants';

const newWasteCard = (state) => {
  const waste = state[areas.WASTE];
  const stock = state[areas.STOCK];
  const nextWaste = stock.slice(0, 1);
  nextWaste[0] = { ...nextWaste[0], hidden: false };
  const nextUltimateStockCard = waste.length > 0 ? { ...waste[0], hidden: true } : [];
  const nextStock = [...stock.slice(1)].concat(nextUltimateStockCard);
  return { ...state, [areas.WASTE]: nextWaste, [areas.STOCK]: nextStock };
};
export default newWasteCard;
