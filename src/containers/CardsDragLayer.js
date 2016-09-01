import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { areas } from '../game/constants';
import List from '../components/List';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';

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

const CardsPreview = ({ item }) => {
  if (!item) return <div />;
  const { index, card, source, items } = item;
  switch (source) {
    case areas.WASTE:
      const WrappedCard = Wrapper('card-container dragged')(Card);
      return <WrappedCard card={card} />;

    case areas.TABLEAU:
      const Stack = List('card')(Wrapper('card-container dragged')(Card));
      return <Stack items={items.slice(index)} />;

    default:
      return <div />;
  }
};

CardsPreview.propTypes = {
  item: PropTypes.object,
};

const CardsDragLayer = (props) =>
  <div className="drag-layer">
    <div style={getItemStyles(props)}>
      <CardsPreview {...props} />
    </div>
  </div>;

export default DragLayer(collect)(CardsDragLayer);
