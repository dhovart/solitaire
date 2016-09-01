import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragLayer } from 'react-dnd';
import List from '../components/List';
import DraggedCard from '../components/DraggedCard';

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

const CardsPreview = ({ item, itemType, tableaux }) => {
  if (!item || !itemType) {
    return <div />;
  }
  switch (itemType) {
    case 'tableauCard':
      const { stackPos, tableau } = item;
      const cards = tableaux[tableau].slice(stackPos);
      const Stack = List('card', 'cards-dragged')(DraggedCard);
      return (
        <Stack items={cards} />
      );
    case 'wasteCard':
      const { card } = item;
      return (
        <div className="cards-dragged">
          <DraggedCard card={card} />
        </div>
      );
    default:
      return <div />;
  }
};

CardsPreview.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  tableaux: PropTypes.array,
};

const CardsDragLayer = (props) =>
  <div className="drag-layer">
    <div style={getItemStyles(props)}>
      <CardsPreview {...props} />
    </div>
  </div>;

const mapStateToProps = (state) => ({
  tableaux: state.tableaux,
});

export default connect(mapStateToProps)(
  DragLayer(collect)(
    CardsDragLayer
  )
);
