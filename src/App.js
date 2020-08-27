import React from 'react';

import 'normalize.css';
import 'flexboxgrid';
import './styles.css';
import Chessboard from './pages/Chessboard';

function App() {
  return (
    <div className="app-content">
      <Chessboard rowsNumber={8} />
    </div>
  );
}

export default App;
