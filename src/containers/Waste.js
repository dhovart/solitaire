import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classNames from 'classnames/bind';
import { collectDrag } from '../helpers/dnd';
import Card from '../components/Card';

const Waste = ({
  connectDragSource,
  connectDragPreview,
  dragging,
  highlighted,
  waste,
}) => {
  connectDragPreview(getEmptyImage());
  const classes = classNames('card-container', { highlighted, dragging });
  return (
    <div className="waste">
      {waste.map((c, i) =>
        connectDragSource(<div className={classes} key={i}><Card card={c} /></div>))}
    </div>
  );
};

Waste.propTypes = {
  waste: PropTypes.array.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(
  DragSource(
    'wasteCard',
    cardSource,
    collectDrag
  )(
    Waste
  )
);
