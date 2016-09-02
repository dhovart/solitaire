import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash.flow';
import { areas } from '../game/constants';
import { collectDrop } from '../helpers/dnd';
import List from '../components/List';
import Card from '../components/Card';
import CardsMatcher from '../containers/CardsMatcher';
import { foundationComparator, allowOnEmptyFoundation } from '../game/cardMatchers';

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

const foundationTarget = {
  canDrop({ isAllowed }, monitor) {
    const { card } = monitor.getItem();
    return isAllowed(card);
  },
  drop({ index, dispatch }, monitor) {
    const from = monitor.getItem();
    const to = { area: areas.FOUNDATIONS, stackNumber: index };
    dispatch({ type: 'MOVE_CARDS', to, from });
  },
};

export default flow(
  DropTarget('card', foundationTarget, collectDrop),
  CardsMatcher(foundationComparator, allowOnEmptyFoundation)
)(Foundation);