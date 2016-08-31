export const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  dragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
});

export const collectDrop = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.isOver() && monitor.canDrop(),
});
