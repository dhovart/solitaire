import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

const CardComponent = ({ card }) => {
  const { suit, value, hidden } = card;
  const classes = classNames('card', {
    red: !hidden && ['♥', '♦'].includes(suit),
    hidden,
  });
  return (
    <div className={classes}>
      {hidden ? '' : `${value} - ${suit}`}
    </div>
  );
};

CardComponent.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }),
};

export default CardComponent;
