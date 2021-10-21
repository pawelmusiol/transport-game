import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
//import CombinedProviders from './providers'

ReactDOM.render(
  <React.StrictMode>
    {/*<CombinedProviders>*/}
    <Router>
      <App />
    </Router>
    {/*</CombinedProviders>*/}
  </React.StrictMode>,
  document.getElementById('root')
);
