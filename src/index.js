import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import App from './components/App';
import './styles/app.scss';

let enhancers = null;
if (window.devToolsExtension && process.env.NODE_ENV !== 'production') {
  enhancers = window.devToolsExtension();
}

const store = createStore(reducer, enhancers);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
