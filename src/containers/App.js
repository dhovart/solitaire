import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import StockContainer from './StockContainer';
import FoundationsContainer from './FoundationsContainer';
import TableauxContainer from './TableauxContainer';
import WasteContainer from './WasteContainer';
import CardsDragLayer from './CardsDragLayer';

const App = () =>
  <div className="solitaire">
    <div className="top">
      <div className="reserve">
        <StockContainer />
        <WasteContainer />
      </div>
      <FoundationsContainer />
    </div>
    <TableauxContainer />
    <CardsDragLayer />
  </div>;

export default DragDropContext(HTML5Backend)(App);
