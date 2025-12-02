import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Assume App wraps OathFlow then ResonanceVoid

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
