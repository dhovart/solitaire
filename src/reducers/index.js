import getNewState from '../game/new';
import moveCards from './moveCards';
import newWasteCard from './newWasteCard';

const reducer = (state = undefined, action) => {
  if (typeof state === 'undefined' || state === null) {
    state = getNewState();
  }
  if (typeof action === 'undefined') {
    return state;
  }
  if (action.type === 'MOVE_CARDS') {
    return moveCards(state, action);
  }
  if (action.type === 'NEW_WASTE_CARD') {
    return newWasteCard(state);
  }
  return state;
};
export default reducer;
