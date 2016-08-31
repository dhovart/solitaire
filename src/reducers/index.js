import getNewState from '../game/new';

// mutate array, only to be used with new items
const updateLastCardVisibility = (stack, reveal = true) => {
  if (stack.length === 0) return;
  const lastIndex = stack.length - 1;
  const card = stack[lastIndex];
  stack[lastIndex] = { ...card, hidden: !reveal };
};

const reducer = (state = getNewState(), action) => {
  const { tableaux, foundations, stock, waste } = state;

  if (typeof action === 'undefined') return state;
  const { type } = action;

  if (type === 'MOVE_TABLEAU_CARDS') {
    // stackPos: the position of the first moved card in the source tableau.
    // if it's lesser than the length of the tableau, we're moving several cards at once
    const { to, from, stackPos } = action;
    const replacingTableaux = {
      [to]: [...tableaux[to], ...tableaux[from].slice(stackPos)],
      [from]: tableaux[from].slice(0, stackPos),
    };
    updateLastCardVisibility(replacingTableaux[from]);
    const nextTableaux = Object.assign([], tableaux, replacingTableaux);
    return { ...state, tableaux: nextTableaux };
  }

  if (type === 'MOVE_TABLEAU_CARD_TO_FOUNDATION') {
    const { from, to } = action;
    const nextTableaux = Object.assign([], tableaux, {
      [from]: tableaux[from].slice(0, -1),
    });
    updateLastCardVisibility(nextTableaux[from]);

    const nextFoundations = Object.assign([], foundations, {
      [to]: [...foundations[to], ...tableaux[from].slice(-1)],
    });
    return { ...state, tableaux: nextTableaux, foundations: nextFoundations };
  }

  if (type === 'NEW_WASTE_CARD') {
    const nextWaste = [...stock.slice(0, 1)];
    nextWaste[0] = { ...nextWaste[0], hidden: false }; // reveal
    const nextUltimateStockCard = waste.length > 0 ? { ...waste[0], hidden: true } : [];
    const nextStock = [...stock.slice(1)].concat(nextUltimateStockCard);
    return { ...state, waste: nextWaste, stock: nextStock };
  }

  if (type === 'MOVE_WASTE_CARD_TO_TABLEAU') {
    const { to } = action;
    const nextWaste = [];
    const nextTableaux = Object.assign([], tableaux, {
      [to]: [...tableaux[to], ...waste.slice(0, 1)],
    });
    return { ...state, waste: nextWaste, tableaux: nextTableaux };
  }

  if (type === 'MOVE_WASTE_CARD_TO_FOUNDATION') {
    const { to } = action;
    const nextWaste = [];
    const nextFoundations = Object.assign([], foundations, {
      [to]: [...foundations[to], ...waste.slice(0, 1)],
    });
    return { ...state, waste: nextWaste, foundations: nextFoundations };
  }

  return state;
};
export default reducer;
