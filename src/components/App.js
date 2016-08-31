import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Foundations from './Foundations';
import Tableaux from './Tableaux';
import StockContainer from '../containers/StockContainer';
import WasteContainer from '../containers/WasteContainer';
import CardsDragLayer from '../containers/CardsDragLayer';

const App = () =>
  <div className="solitaire">
    <div className="top">
      <div className="reserve">
        <StockContainer />
        <WasteContainer />
      </div>
      <Foundations />
    </div>
    <Tableaux />
    <CardsDragLayer />
  </div>;

export default DragDropContext(HTML5Backend)(App);
