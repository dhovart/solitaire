import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { collectDrop } from '../helpers/dnd';
import TableauCardContainer from '../containers/TableauCardContainer';

const TableauContainer = ({ cards, index, connectDropTarget, highlighted }) => {
  const classes = classNames('tableau', { 'highlighted': highlighted });
  return connectDropTarget(
    <div className={classes}>
      {cards.map((c, i) =>
        <TableauCardContainer key={i} tableau={index} card={c} stackPos={i} />
      )}
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
    return cards.length === 0 && card.value === 13;
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

export default
  connect()
  (DropTarget(['wasteCard', 'tableauCard'], tableauTarget, collectDrop)
  (TableauContainer));
