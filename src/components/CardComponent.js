import React, { PropTypes } from 'react';

const CardComponent = ({ card }) => {
  const { suit, value } = card;
  return (
    <div className="card">
      {`${value} - ${suit}`}
    </div>
  );
};

CardComponent.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    value: PropTypes.number,
  }),
};

export default CardComponent;
