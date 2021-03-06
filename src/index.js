import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import {Router,browserHistory} from 'react-router';
import routes from './routes'
import reduxThunk from 'redux-thunk';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import {ADMIN_LOGIN,ADMIN_LOGOUT} from './actions/index';
window.$ = $;
window.jQuery = $;

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token){store.dispatch({type: ADMIN_LOGIN});}
else{store.dispatch({type: ADMIN_LOGOUT});}

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
  , document.querySelector('.app_container'));