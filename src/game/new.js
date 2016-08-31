import { getNewDeck, shuffle } from '../helpers/deck';

const deck = shuffle(getNewDeck());
const foundations = Array(4).fill([]);
const waste = Array(0);
const tableaux = Array(7).fill([]).map(
  (tableau, i) => deck.splice(0, i + 1)
);
tableaux.forEach((tableau, i) => {
  const card = tableau[i];
  card.hidden = false;
});
const getNewState = () => ({
  stock: deck,
  foundations,
  waste,
  tableaux,
});
export default getNewState;
