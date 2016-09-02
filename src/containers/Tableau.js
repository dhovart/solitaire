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
      <TableauStack stackNumber={index} area={areas.TABLEAUX} items={cards} />
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
    const { stackNumber: from, area, card } = monitor.getItem();
    if (area === areas.TABLEAUX && to === from) return false;
    if (cards.length === 0) return card.value === 13;
    return matchingTableauxCards(cards[cards.length - 1], card);
  },
  drop({ index, dispatch }, monitor) {
    const from = monitor.getItem();
    const to = { area: areas.TABLEAUX, stackNumber: index };
    dispatch({ type: 'MOVE_CARDS', to, from });
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
