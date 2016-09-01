import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames/bind';

const Card = ({ card }) => {
const { suit, symbol, hidden } = card;
  const classes = classNames('card', {
    red: !hidden && ['♥', '♦'].includes(suit),
    hidden,
  });
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionAppear={true}
      transitionName="flash"
      transitionEnterTimeout={5000}
      transitionLeaveTimeout={5000}
      transitionAppearTimeout={5000}>
      <div className={classes}>{hidden ? String.fromCodePoint(0x1F0A0) : symbol}</div>
    </ReactCSSTransitionGroup>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    value: PropTypes.number,
    hidden: PropTypes.bool,
  }).isRequired,
};

export default Card;
