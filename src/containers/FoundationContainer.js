import React, { PropTypes } from 'react';
import CardComponent from '../components/CardComponent';

const FoundationContainer = ({ cards }) =>
  <div className="foundation">
    {cards.map((c, i) =>
      <CardComponent key={i} card={c} />
    )}
  </div>;

FoundationContainer.propTypes = {
  cards: PropTypes.array,
};

export default FoundationContainer;
