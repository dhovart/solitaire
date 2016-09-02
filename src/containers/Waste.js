import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DraggableCard from '../containers/DraggableCard';
import { areas } from '../game/constants';
import Wrapper from '../components/Wrapper';

const WasteCard = Wrapper('card-container')(DraggableCard);
const Waste = ({ waste }) =>
  <div className="waste">
    {waste.map((c, i) =>
      <WasteCard key={i} card={c} index={i} area={areas.WASTE} stackNumber={0} />)}
  </div>;
Waste.propTypes = { waste: PropTypes.array.isRequired };
const mapStateToProps = (state) => ({ waste: state.waste });
export default connect(mapStateToProps)(Waste);
