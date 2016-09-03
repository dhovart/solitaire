import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames/bind';
import { isRed } from '../helpers/deck';

const Card = ({ card }) => {
const { symbol, hidden } = card;
  const classes = classNames('card', {
    red: !hidden && isRed(card),
    hidden,
  });
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionAppear={true}
      transitionName="flash"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionAppearTimeout={500}>
      <div key={symbol} className={classes}>
        {hidden ? String.fromCodePoint(0x1F0A0) : symbol}
      </div>
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
