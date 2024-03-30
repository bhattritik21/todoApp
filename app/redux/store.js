"use client"
import { createStore } from 'redux';
import todoReducer from './todoReducer';
import { loadState, saveState } from '../utils/SaveTodoslocal';

const persistedState = loadState();

const store = createStore(
  todoReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

export default store;
