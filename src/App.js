import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

function App() {
  return (
    <div className="App">
      <Palette colors={seedColors[4]}/>
    </div>
  );
}

export default App;
