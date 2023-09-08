import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
  groups: [],
};

const store = createStore(rootReducer, initialState);

export default store;
