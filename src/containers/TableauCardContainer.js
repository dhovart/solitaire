import React, { PropTypes } from 'react';
import CardComponent from '../components/CardComponent';

const TableauCardContainer = ({ card }) =>
  <div className="card-container">
    <CardComponent card={card} />
  </div>;

TableauCardContainer.propTypes = {
  card: PropTypes.shape({
    suit: PropTypes.string,
    value: PropTypes.number,
  }),
};
export default TableauCardContainer;
