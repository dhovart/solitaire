import React, { PropTypes } from 'react';

/*
  Inject into the props of the decorated component (a card stack, basically) a `isAllowed`
  function to check if a card can be dropped on it.
  Compares against the last card of the stack, thus the `cards` propType is required.

  `compareAgainst` must have the signature: compareAgainst = (cardA) => (cardB) => boolean
  `filterWhenEmpty` must have the signature: filterWhenEmpty = (card) => boolean
*/

const CardsMatcher = (compareAgainst, filterWhenEmpty) => (DecoratedComponent) => {
  const CardsMatcher = (props) => {
    const { cards } = props;
    const compareFn = cards.length > 0 ? compareAgainst(cards[cards.length - 1]) : filterWhenEmpty;
    return <DecoratedComponent isAllowed={compareFn} {...props}  />;
  };
  CardsMatcher.propTypes = { cards: PropTypes.array.isRequired };
  return CardsMatcher;
};

export default CardsMatcher;
