import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CardComponent from '../components/CardComponent';

const WasteContainer = ({ waste }) =>
  <div className="waste">
    {waste.map((c, i) =>
      <div className="card-container" key={i}><CardComponent card={c} /></div>
    )}
  </div>;

WasteContainer.propTypes = {
  waste: PropTypes.array,
};

const mapStateToProps = (state) => ({
  waste: state.waste,
});

export default connect(mapStateToProps)(WasteContainer);
