import { createStore } from 'redux';
import { initialItems } from '../src/data.js';
const initialState = {
  searchQuery: '',
  allItems: initialItems,
  cart: []
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'REFINE_SEARCH':
      return { ...state, searchQuery: action.search };
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
