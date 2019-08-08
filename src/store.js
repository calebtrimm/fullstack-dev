import { createStore } from 'redux';
import initialItems from '../src/data.js';

const initialState = {
  searchQuery: '',
  allItems: initialItems,
  loggedIn: false
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'REFINE_SEARCH':
      return { ...state, searchQuery: action.search };
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, userId: action.userId };
    case 'LOGOUT':
      return { ...state, loggedIn: false };
    // case 'ADD_ITEM':
    //   return { ...state, allItems: state.allItems.concat(action.item) };
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
