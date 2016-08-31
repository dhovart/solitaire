import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classNames from 'classnames/bind';
import { collectDrag, collectDrop } from '../helpers/dnd';
import CardComponent from '../components/CardComponent';

const TableauCardContainer = ({
  connectDragSource,
  connectDropTarget,
  connectDragPreview,
  card,
  highlighted,
  dragging,
}) => {
  connectDragPreview(getEmptyImage());
  const classes = classNames('card-container', { highlighted, dragging });
  return connectDropTarget(connectDragSource(
    <div className={classes}>
      <CardComponent card={card} />
    </div>
  ));
};

TableauCardContainer.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    symbol: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
  dragging: PropTypes.bool,
};

const cardSource = {
  canDrag({ card }) {
    return !card.hidden;
  },
  beginDrag({ card, tableau, stackPos }) {
    return { card, tableau, stackPos };
  },
};

const black = ['♠', '♣'];
const red = ['♥', '♦'];

const accepts = (card, otherCard) => {
  const ofOppositeColor = black.includes(card.suit) ?
    red.includes(otherCard.suit) :
    black.includes(otherCard.suit);
  return ofOppositeColor && otherCard.value === card.value - 1;
};

const cardTarget = {
  canDrop({ tableau: to, card }, monitor) {
    if (card.hidden === true) return false;
    const { card: otherCard, tableau: from } = monitor.getItem();
    if (to === from) return false;
    return accepts(card, otherCard);
  },
  drop({ tableau: to, dispatch }, monitor) {
    const { tableau: from, stackPos } = monitor.getItem();
    switch (monitor.getItemType()) {
      case 'tableauCard':
        dispatch({ type: 'MOVE_TABLEAU_CARDS', stackPos, from, to });
        break;
      case 'wasteCard':
        dispatch({ type: 'MOVE_WASTE_CARD_TO_TABLEAU', to });
        break;
      default:
        return;
    }
  },
};

export default connect()(
  DropTarget(
    ['tableauCard', 'wasteCard'],
    cardTarget,
    collectDrop
  )(
    DragSource(
      'tableauCard',
      cardSource,
      collectDrag
    )(
      TableauCardContainer
    )
  )
);
