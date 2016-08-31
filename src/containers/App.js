import React from 'react';
import StockContainer from './StockContainer';
import FoundationsContainer from './FoundationsContainer';
import TableauxContainer from './TableauxContainer';
import WasteContainer from './WasteContainer';

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
  </div>;

export default App;
