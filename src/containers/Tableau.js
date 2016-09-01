import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { collectDrop } from '../helpers/dnd';
import { matchingTableauCards } from '../helpers/deck';
import List from '../components/List';
import TableauCard from '../containers/TableauCard';

const TableauStack = List('card')(TableauCard);
const TableauContainer = ({ cards, index, connectDropTarget, highlighted }) => {
  const classes = classNames('tableau', { highlighted });
  return connectDropTarget(
    <div className={classes}>
      <TableauStack tableau={index} items={cards} />
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
    const { tableau: from, card } = monitor.getItem();
    if (to === from) return false;
    if (cards.length === 0) return card.value === 13;
    return matchingTableauCards(cards[cards.length - 1], card);
  },
  drop({ index: to, dispatch }, monitor) {
    const { stackPos, tableau: from } = monitor.getItem();
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
    ['wasteCard', 'tableauCard'],
    tableauTarget,
    collectDrop
  )(
    TableauContainer
  )
);
