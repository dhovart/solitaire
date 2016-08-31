import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

const CardComponent = ({ card }) => {
  const { suit, symbol, hidden } = card;
  const classes = classNames('card', {
    red: !hidden && ['♥', '♦'].includes(suit),
    hidden,
  });
  return (
    <div className={classes}>{hidden ? String.fromCodePoint(0x1F0A0) : symbol}</div>
  );
};

CardComponent.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }).isRequired,
};

export default CardComponent;
