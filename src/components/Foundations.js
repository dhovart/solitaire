import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FoundationContainer from '../containers/FoundationContainer';

const Foundations = ({ foundations }) =>
  <div className="foundations">
    {foundations.map((f, i) => <FoundationContainer key={i} index={i} cards={f} />)}
  </div>;

const mapStateToProps = (state) => ({
  foundations: state.foundations,
});

Foundations.propTypes = {
  foundations: PropTypes.array,
};

export default connect(mapStateToProps)(Foundations);
