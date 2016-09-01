import React from 'react';

const Wrapper = (className, Component = 'div') =>
  (ComponentWrapped) => (props) =>
    <Component className={className}>
      <ComponentWrapped {...props} />
    </Component>;

export default Wrapper;
