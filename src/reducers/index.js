import getNewState from '../game/new';

const getCardWithUpdatedVisibility = (card, reveal = true) => {
  return { ...card, hidden: !reveal };
};

const reducer = (state = undefined, action) => {
  if (typeof state === 'undefined' || state === null)
    state = getNewState();
  const { tableaux, foundations, stock, waste } = state;

  if (typeof action === 'undefined') return state;
  const { type } = action;

  if (type === 'MOVE_TABLEAU_CARDS') {
    // stackPos: the position of the first moved card in the source tableau. If
    // lesser than the greater index of the tableau, we're moving several cards.
    const { to, from, stackPos } = action;

    const revealedCard = getCardWithUpdatedVisibility(
      ...tableaux[from].slice(stackPos - 1, stackPos)
    );
    const replacingTableaux = {
      [from]: tableaux[from].slice(0, stackPos - 1).concat([revealedCard]),
      [to]: [...tableaux[to], ...tableaux[from].slice(stackPos)],
    };
    const nextTableaux = Object.assign([], tableaux, replacingTableaux);
    return { ...state, tableaux: nextTableaux };
  }

  if (type === 'MOVE_TABLEAU_CARD_TO_FOUNDATION') {
    const { from, to } = action;
    const revealedCard = getCardWithUpdatedVisibility(
      ...tableaux[from].slice(-2, -1)
    );
    const nextTableaux = Object.assign([], tableaux, {
      [from]: tableaux[from].slice(0, -2).concat([revealedCard]),
    });
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
