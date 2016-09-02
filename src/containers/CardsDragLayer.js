import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import CardsPreview from '../components/CardsPreview';

const collect = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
});

const getItemStyles = ({ initialOffset, currentOffset }) => {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CardsDragLayer = (props) =>
  <div className="drag-layer">
    <div style={getItemStyles(props)}>
      <CardsPreview {...props} />
    </div>
  </div>;

export default DragLayer(collect)(CardsDragLayer);
