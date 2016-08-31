import getNewState from '../game/new';

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
    const nextTableaux = Object.assign([], tableaux, replacingTableaux);
    return { ...state, tableaux: nextTableaux };
  }

  if (type === 'MOVE_TABLEAU_CARD_TO_FOUNDATION') {
    const { from, to } = action;
    const nextTableaux = Object.assign([], tableaux, {
      [from]: tableaux[from].slice(0, -1),
    });
    const nextFoundations = Object.assign([], foundations, {
      [to]: [...foundations[to], ...tableaux[from].slice(-1)],
    });
    return { ...state, tableaux: nextTableaux, foundations: nextFoundations };
  }
};
export default reducer;
