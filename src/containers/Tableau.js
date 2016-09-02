import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash.flow';
import { areas } from '../game/constants';
import { collectDrop } from '../helpers/dnd';
import List from '../components/List';
import DraggableCard from '../containers/DraggableCard';
import CardsMatcher from '../containers/CardsMatcher';
import { tableauComparator, allowOnEmptyTableau } from '../game/cardMatchers';

const TableauStack = List('card')(DraggableCard);
const Tableau = ({
  cards,
  index,
  connectDropTarget,
  highlighted,
  ...props
}) => {
  const classes = classNames('tableau', { highlighted });
  return connectDropTarget(
    <div className={classes}>
      <TableauStack stackNumber={index} area={areas.TABLEAUX} items={cards} />
    </div>
  );
};

Tableau.propTypes = {
  cards: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
};

const tableauTarget = {
  canDrop({ isAllowed }, monitor) {
    const { card } = monitor.getItem();
    return isAllowed(card);
  },
  drop({ index, dispatch }, monitor) {
    const from = monitor.getItem();
    const to = { area: areas.TABLEAUX, stackNumber: index };
    dispatch({ type: 'MOVE_CARDS', to, from });
  },
};

export default flow(
  DropTarget('card', tableauTarget, collectDrop),
  CardsMatcher(tableauComparator, allowOnEmptyTableau)
)(Tableau);