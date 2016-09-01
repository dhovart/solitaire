import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { areas } from '../game/constants';
import { collectDrop } from '../helpers/dnd';
import { matchingTableauxCards } from '../game/constraints';
import List from '../components/List';
import DraggableCard from '../containers/DraggableCard';

const TableauStack = List('card')(DraggableCard);
const TableauContainer = ({ cards, index, connectDropTarget, highlighted }) => {
  const classes = classNames('tableau', { highlighted });
  return connectDropTarget(
    <div className={classes}>
      <TableauStack sourceIndex={index} source={areas.TABLEAU} items={cards} />
    </div>
  );
};

TableauContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
};

const tableauTarget = {
  canDrop({ index: to, cards }, monitor) {
    const { sourceIndex: from, card } = monitor.getItem();
    if (to === from) return false;
    if (cards.length === 0) return card.value === 13;
    return matchingTableauxCards(cards[cards.length - 1], card);
  },
  drop({ index: to, dispatch }, monitor) {
    const { index, source, sourceIndex: from } = monitor.getItem();
    switch (source) {
      case areas.TABLEAU:
        dispatch({ type: 'MOVE_TABLEAU_CARDS', to, from, index });
        break;

      case areas.WASTE:
        dispatch({ type: 'MOVE_WASTE_CARD_TO_TABLEAU', to });
        break;

      default:
        return;
    }
  },
};

export default connect()(
  DropTarget(
    'card',
    tableauTarget,
    collectDrop
  )(
    TableauContainer
  )
);
