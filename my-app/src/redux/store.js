// store.js
import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducer';
import {authReducer } from "./authReducer "

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;