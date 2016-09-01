import React, { PropTypes } from 'react';

const List = (itemsPropName, className) => (ComponentListed) => {
  const List = (props) =>
    <div className={className || ''}>
      {props.items.map((item, i) => {
        props = { ...props, [itemsPropName]: item };
        return (<ComponentListed key={i} index={i} stackPos={i} {...props} />);
      })}
    </div>;
  List.propTypes = { items: PropTypes.array.isRequired };
  return List;
};

export default List;
