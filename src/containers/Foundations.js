import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../components/List';
import Foundation from '../containers/Foundation';

const Foundations = List('cards', 'foundations')(Foundation);
const mapStateToProps = (state) => ({ items: state.foundations });
export default connect(mapStateToProps)(Foundations);
