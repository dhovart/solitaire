import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import { areas } from '../game/constants';
import { matchingFoundationCards } from '../game/constraints';
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

const foundationTarget = {
  canDrop({ cards }, monitor) {
    const { card } = monitor.getItem();
    if (cards.length === 0) {
      return card.value === 1; // only accept aces if empty
    }
    return matchingFoundationCards(cards[cards.length - 1], card);
  },
  drop({ index: to, dispatch }, monitor) {
    const { sourceIndex: from, source } = monitor.getItem();
    switch (source) {
      case areas.TABLEAU:
        dispatch({ type: 'MOVE_TABLEAU_CARD_TO_FOUNDATION', from, to });
        break;
      case areas.WASTE:
        dispatch({ type: 'MOVE_WASTE_CARD_TO_FOUNDATION', to });
        break;
      default:
        return;
    }
  },
};

export default connect()(
  DropTarget(
    'card',
    foundationTarget,
    collectDrop
  )(
    Foundation
  )
);
