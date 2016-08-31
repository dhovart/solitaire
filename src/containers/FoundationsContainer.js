import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FoundationContainer from '../containers/FoundationContainer';

const FoundationsContainer = ({ foundations }) =>
  <div className="foundations">
    {foundations.map((f, i) => <FoundationContainer key={i} index={i} cards={f} />)}
  </div>;

// add proptypes

const mapStateToProps = (state) => ({
  foundations: state.foundations,
});

FoundationsContainer.propTypes = {
  foundations: PropTypes.array,
};

export default connect(mapStateToProps)(FoundationsContainer);
