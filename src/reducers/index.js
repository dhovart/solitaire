import getNewState from '../game/new';

const getCardWithUpdatedVisibility = (card, reveal = true) =>
  ({ ...card, hidden: !reveal });

const revealLastCard = (stack) => {
  if (stack.length === 0) return stack;
  return stack.slice(0, -1).concat([getCardWithUpdatedVisibility(
    ...stack.slice(-1)
  )]);
};

const reducer = (state = undefined, action) => {
  if (typeof state === 'undefined' || state === null) {
    state = getNewState();
  }
  const { tableaux, foundations, stock, waste } = state;

  if (typeof action === 'undefined') return state;
  const { type } = action;

  if (type === 'MOVE_TABLEAU_CARDS') {
    // index: the position of the first moved card in the source tableau. If
    // lesser than the greater index of the tableau, we're moving several cards.
    const { to, from, index } = action;

    let nextSourceTableau = tableaux[from].slice(0, index);
    nextSourceTableau = revealLastCard(nextSourceTableau);

    const replacingTableaux = {
      [from]: nextSourceTableau,
      [to]: [...tableaux[to], ...tableaux[from].slice(index)],
    };
    const nextTableaux = Object.assign([], tableaux, replacingTableaux);
    return { ...state, tableaux: nextTableaux };
  }

  if (type === 'MOVE_TABLEAU_CARD_TO_FOUNDATION') {
    const { from, to } = action;

    let nextSourceTableau = tableaux[from].slice(0, -1);
    nextSourceTableau = revealLastCard(nextSourceTableau);

    const nextTableaux = Object.assign([], tableaux, {
      [from]: nextSourceTableau,
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
