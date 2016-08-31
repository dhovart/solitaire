import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import { collectDrag } from '../helpers/dnd';
import CardComponent from '../components/CardComponent';

const WasteContainer = ({
  connectDragSource,
  dragging,
  highlighted,
  waste,
}) => {
  const classes = classNames('card-container', { highlighted, dragging });
  return (
    <div className="waste">
      {waste.map((c, i) =>
        connectDragSource(<div className={classes} key={i}><CardComponent card={c} /></div>))}
    </div>
  );
};

WasteContainer.propTypes = {
  waste: PropTypes.array.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  highlighted: PropTypes.bool,
  dragging: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  waste: state.waste,
});

const cardSource = {
  canDrag() {
    return true;
  },
  beginDrag({ waste }) {
    return { card: waste[waste.length - 1] };
  },
};

export default
  connect(mapStateToProps)
  (DragSource('wasteCard', cardSource, collectDrag)(WasteContainer));
