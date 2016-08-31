import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TableauContainer from '../containers/TableauContainer';

const Tableaux = ({ tableaux }) =>
  <div className="tableaux">
    {tableaux.map((t, i) => <TableauContainer key={i} index={i} cards={t} />)}
  </div>;

Tableaux.propTypes = {
  tableaux: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tableaux: state.tableaux,
});

export default connect(mapStateToProps)(Tableaux);
