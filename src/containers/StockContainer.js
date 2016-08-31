import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CardComponent from '../components/CardComponent';

const StockContainer = ({ stock, onClick }) => {
  const empty = stock.length === 0;
  const card = !empty ? <CardComponent card={stock[0]} /> : '';
  const style = empty ? { display: 'none' } : {};
  return (
    <div onClick={onClick} style={style} className="card-container stock">{card}</div>
  );
};

StockContainer.propTypes = {
  stock: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch({ type: 'NEW_WASTE_CARD' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);
