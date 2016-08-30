import { createStore } from 'redux';
import reducer from './reducers/index';

let enhancers = null;
if (window.devToolsExtension && !PRODUCTION) {
  enhancers = window.devToolsExtension();
}

const store = createStore(reducer, enhancers);
