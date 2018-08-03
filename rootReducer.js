import { combineReducers } from 'redux';
import gamesReducer from './games/gamesReducer';
import gameLevelsReducer from './games/gameLevelsReducer';

export default combineReducers({
  games: gamesReducer,
  gameLevels: gameLevelsReducer,
});
