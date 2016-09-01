import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';

const Stock = ({ stock, onClick }) => {
  const empty = stock.length === 0;
  const card = !empty ? <Card card={stock[0]} /> : '';
  const style = empty ? { display: 'none' } : {};
  return (
    <div onClick={onClick} style={style} className="stock card-container">{card}</div>
  );
};

Stock.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
