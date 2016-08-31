import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TableauContainer from '../containers/TableauContainer';

const TableauxContainer = ({ tableaux }) =>
  <div className="tableaux">
    {tableaux.map((t, i) => <TableauContainer key={i} index={i} cards={t} />)}
  </div>;

TableauxContainer.propTypes = {
  tableaux: PropTypes.array,
};

const mapStateToProps = (state) => ({
  tableaux: state.tableaux,
});

export default connect(mapStateToProps)(TableauxContainer);
