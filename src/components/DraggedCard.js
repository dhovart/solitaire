import React from 'react';
import Card from '../components/Card';

const DraggedCard = ({card}) =>
  <div className="card-container"><Card card={card} /></div>;

export default DraggedCard;
