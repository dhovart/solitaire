import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classNames from 'classnames/bind';
import { collectDrag, collectDrop } from '../helpers/dnd';
import Card from '../components/Card';

const TableauCard = ({
  connectDragSource,
  connectDragPreview,
  card,
  highlighted,
  dragging,
}) => {
  connectDragPreview(getEmptyImage());
  const classes = classNames('card-container', { highlighted, dragging });
  return connectDragSource(
    <div className={classes}>
      <Card card={card} />
    </div>
  );
};

TableauCard.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    symbol: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }).isRequired,
  connectDragSource: PropTypes.func.isRequired,
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

export default connect()(
  DragSource(
    'tableauCard',
    cardSource,
    collectDrag
  )(
    TableauCard
  )
);
