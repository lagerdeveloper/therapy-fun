import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { devToolsEnhancer } from 'redux-devtools-extension';
import AsyncStorage from 'redux-persist/lib/storage';
import axios from 'axios';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const initialState = {
  games: [1, 2],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default () => {
  let store = process.env.NODE_ENV === 'production' ? createStore(persistedReducer, initialState) : createStore(persistedReducer, initialState, devToolsEnhancer());
  let persistor = persistStore(store);
  return { store, persistor };
}
