import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classNames from 'classnames/bind';
import { collectDrag } from '../helpers/dnd';
import Card from '../components/Card';

const DraggableCard = ({
  connectDragSource,
  connectDragPreview,
  card,
  dragging,
}) => {
  connectDragPreview(getEmptyImage());
  const classes = classNames('card-container', { dragging });
  return connectDragSource(
    <div className={classes}>
      <Card card={card} />
    </div>
  );
};

DraggableCard.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    symbol: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }).isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  dragging: PropTypes.bool,
};

const cardSource = {
  canDrag: ({ card }) => !card.hidden,
  beginDrag: (props) => props,
};

export default connect()(DragSource('card', cardSource, collectDrag)(DraggableCard));
