import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

// Subscribe to log the current state
store.subscribe(() => {
  console.log('Current state:', store.getState());
});

export default store;
