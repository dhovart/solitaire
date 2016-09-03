import React from 'react';

/*
  A Wrapper component may not look too useful at first glance, but I find it useful
  to remove noise when composed with other higher order components.
  I use it in combination with the List component to wrap each Card component listed in a
  div with the "card-container“ class (that I don't want everywhere).
*/
const Wrapper = (className, Component = 'div') =>
  (ComponentWrapped) => (props) =>
    <Component className={className}>
      <ComponentWrapped {...props} />
    </Component>;

export default Wrapper;
