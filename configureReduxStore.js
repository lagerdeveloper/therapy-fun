import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { devToolsEnhancer } from 'redux-devtools-extension';
import AsyncStorage from 'redux-persist/lib/storage';
import axios from 'axios';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const initialState = {
  games: [1, 2],
  gameLevels: {
    2: [
      {
        id: 1,
        numRows: 2,
        numCols: 3,
        memTime: 2000,
      },
      {
        id: 2,
        numRows: 2,
        numCols: 3,
        memTime: 1500,
      },
      {
        id: 3,
        numRows: 3,
        numCols: 4,
        memTime: 1000,
      },
      {
        id: 4,
        numRows: 3,
        numCols: 4,
        memTime: 750,
      },
      {
        id: 5,
        numRows: 4,
        numCols: 4,
        memTime: 500,
      }
    ],
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default () => {
  let store = process.env.NODE_ENV === 'production' ? createStore(persistedReducer, initialState) : createStore(persistedReducer, initialState, devToolsEnhancer());
  let persistor = persistStore(store);
  return { store, persistor };
}
