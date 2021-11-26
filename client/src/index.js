import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import CombinedProviders from './providers'
import { Provider } from 'react-redux'
import Store from "./redux/store"

ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
        <CombinedProviders>
            <Router>
                <App />
            </Router>
        </CombinedProviders>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
