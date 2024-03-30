"use client"
import { createStore,applyMiddleware } from 'redux';
import todoReducer from './todoReducer';
import { loadState, saveState } from '../utils/SaveTodoslocal';
import {thunk} from "redux-thunk"

const persistedState = loadState();
const middleware=[thunk];
const store = createStore(
  todoReducer,
  persistedState,
  applyMiddleware(...middleware)
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

export default store;
