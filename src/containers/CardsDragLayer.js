import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragLayer } from 'react-dnd';
import CardComponent from '../components/CardComponent';

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
  var transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const renderCards = ({ item, itemType, tableaux }) => {
  if (!item) return;
  switch(itemType) {
    case 'tableauCard':
      const { stackPos, tableau } = item;
      const cards = tableaux[tableau].slice(stackPos);
      return (
        <div className="cards-dragged">
          {cards.map((c, i) =>
            <div key={i} className="card-container">
              <CardComponent card={c} />
            </div>
          )}
        </div>
      );
    case 'wasteCard':
      const { card } = item;
      return (
        <div className="cards-dragged">
          <div className="card-container">
            <CardComponent card={card} />
          </div>
        </div>
      );
  }
}

const CardsDragLayer = (props) =>
  <div className="drag-layer">
    <div style={getItemStyles(props)}>{renderCards(props)}</div>
  </div>;

const mapStateToProps = (state) => ({
  tableaux: state.tableaux,
});

export default
  connect(mapStateToProps)
  (DragLayer(collect)(CardsDragLayer));
