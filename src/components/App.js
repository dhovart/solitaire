import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Foundations from '../containers/Foundations';
import Tableaux from '../containers/Tableaux';
import Stock from '../containers/Stock';
import Waste from '../containers/Waste';
import CardsDragLayer from '../containers/CardsDragLayer';

const App = () =>
  <div className="solitaire">
    <div className="top">
      <div className="reserve">
        <Stock />
        <Waste />
      </div>
      <Foundations />
    </div>
    <Tableaux />
    <CardsDragLayer />
  </div>;

export default DragDropContext(HTML5Backend)(App);
