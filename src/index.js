import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reduces/reduces';
import {Provider} from 'react-redux';
import RouterMap from './router/routerMap';
import createBrowserHistory from 'history/createBrowserHistory'
import './static/css/icon.css'
import ReduxThunk from 'redux-thunk';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(ReduxThunk,sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <RouterMap history={customHistory} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
