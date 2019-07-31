import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import './main.css';

import reloadMagic from './reload-magic-client.js';
reloadMagic();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
