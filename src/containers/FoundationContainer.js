import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { collectDrop } from '../helpers/dnd';
import CardComponent from '../components/CardComponent';

const FoundationContainer = ({
  connectDropTarget,
  highlighted,
  cards,
}) =>
  connectDropTarget(
    <div className={classNames('foundation', { highlighted })}>
      {cards.map((c, i) =>
        <div key={i} className="card-container">
          <CardComponent card={c} />
        </div>
      )}
    </div>
  );

FoundationContainer.propTypes = {
  cards: PropTypes.array,
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

export default
  connect()
  (DropTarget(['wasteCard', 'tableauCard'], foundationTarget, collectDrop)
  (FoundationContainer));
