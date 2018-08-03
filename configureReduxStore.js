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
    1: [
      {
        id: 1,
        numRows: 2,
        numCols: 2,
        puzzleStr: '+3+4+2-1+2+1+3+4+4+2+1+3+1+3+4+2',
      },
      {
        id: 2,
        numRows: 2,
        numCols: 2,
        puzzleStr: '+3+4+2-1+2+1+3-4+4+2+1+3-1+3+4+2',
      },
      {
        id: 3,
        numRows: 3,
        numCols: 2,
        puzzleStr: '+6-4+1+5-3+2-5+2-3+1+6+4+4+1+2-3+5+6-3+6+5-4+2+1+2+3+4+6+1+5+1+5-6+2+4+3',
      },
      {
        id: 4,
        numRows: 4,
        numCols: 2,
        puzzleStr: '+2+3+5+1+4+8+7+6+4+8+7+6-5+2+1+3+7-2+8+3+1+6+4+5+6+5+1+4+2+3+8+7+8+4-3+2+7+5+6+1+1+7+6+5+3+4+2+8+3-1+4+8+6+7+5+2+5+6+2+7+8+1+3+4',
      },
      {
        id: 5,
        numRows: 3,
        numCols: 3,
        puzzleStr: '+8+4+5+2+1+3+6+9+7+3+6-2+7+9-4+1+5+8+7+1+9+5+8+6+3+2+4+1+8+3+4+6+9-2+7+5+2+7+4+3+5+1+8+6+9+9+5+6+8+7+2+4+1+3+4+3+7+6+2+5+9+8+1+6+9+8+1+4+7+5+3+2-5+2+1+9-3+8+7+4+6',
      },
      {
        id: 6,
        numRows: 3,
        numCols: 3,
        puzzleStr: '+8-1-2-7-5-3-6-4-9-9-4+3+6-8-2-1-7-5-6+7-5-4+9-1+2-8-3-1+5-4-2-3+7-8-9-6-3-6-9-8+4+5+7-2-1-2-8-7+1-6-9-5+3-4-5-2+1-9-7-4-3+6+8-4-3+8+5-2-6-9+1-7-7+9-6-3-1-8+4-5-2',
      },
    ],
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
