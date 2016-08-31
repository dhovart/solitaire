import React, { PropTypes } from 'react';
import TableauCardContainer from '../containers/TableauCardContainer';

const TableauContainer = ({ cards, index }) =>
  <div className="tableau">
    {cards.map((c, i) =>
      <TableauCardContainer key={i} tableau={index} card={c} stackPos={i} />
    )}
  </div>;

TableauContainer.propTypes = {
  cards: PropTypes.array,
  index: PropTypes.number,
};
export default TableauContainer;
