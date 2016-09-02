import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../components/List';
import Tableau from '../containers/Tableau';

const Tableaux = List('cards', 'tableaux')(Tableau);
const mapStateToProps = (state) => ({ items: state.tableaux });
export default connect(mapStateToProps)(Tableaux);