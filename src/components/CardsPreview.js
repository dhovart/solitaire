import React, { PropTypes } from 'react';
import { areas } from '../game/constants';
import List from './List';
import Wrapper from './Wrapper';
import Card from './Card';

const CardsPreview = ({ item }) => {
  if (!item) return <div />;
  const { index, card, area, items } = item;
  switch (area) {
    case areas.WASTE:
      const WrappedCard = Wrapper('card-container dragged')(Card);
      return <WrappedCard card={card} />;

    case areas.TABLEAUX:
      const Stack = List('card')(Wrapper('card-container dragged')(Card));
      return <Stack items={items.slice(index)} />;

    default:
      return <div />;
  }
};

CardsPreview.propTypes = {
  item: PropTypes.object,
};

export default CardsPreview;
