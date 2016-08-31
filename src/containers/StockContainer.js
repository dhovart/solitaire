import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CardComponent from '../components/CardComponent';

const StockContainer = ({ stock }) => {
  const empty = stock.length === 0;
  const card = !empty ? <CardComponent card={stock[0]} /> : '';
  const style = empty ? { display: 'none' } : {};
  return (
    <div style={style} className="card-container stock">{card}</div>
  );
};

StockContainer.propTypes = {
  stock: PropTypes.array,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps)(StockContainer);
