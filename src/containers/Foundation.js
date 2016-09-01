import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { collectDrop } from '../helpers/dnd';
import List from '../components/List';
import Card from '../components/Card';

const FoundationStack = List('card')(Card);
const Foundation = ({ connectDropTarget, highlighted, cards }) =>
  connectDropTarget(
    <div className={classNames('foundation', { highlighted })}>
      <FoundationStack items={cards} />
    </div>
  );

Foundation.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  highlighted: PropTypes.bool.isRequired,
};

const accepts = (card, otherCard) =>
  card.suit === otherCard.suit &&
  card.value === otherCard.value - 1;

const foundationTarget = {
  canDrop({ cards }, monitor) {
    const { card } = monitor.getItem();
    if (cards.length === 0) {
      return card.value === 1; // only accept aces if empty
    }
    return accepts(cards[cards.length - 1], card);
  },
  drop({ index: to, dispatch }, monitor) {
    const { tableau: from } = monitor.getItem();
    switch (monitor.getItemType()) {
      case 'tableauCard':
        dispatch({ type: 'MOVE_TABLEAU_CARD_TO_FOUNDATION', from, to });
        break;
      case 'wasteCard':
        dispatch({ type: 'MOVE_WASTE_CARD_TO_FOUNDATION', to });
        break;
      default:
        return;
    }
  },
};

export default connect()(
  DropTarget(
    ['wasteCard', 'tableauCard'],
    foundationTarget,
    collectDrop
  )(
    Foundation
  )
);
