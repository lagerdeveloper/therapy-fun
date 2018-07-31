import { combineReducers } from 'redux';
import gamesReducer from './games/gamesReducer';

export default combineReducers({
  games: gamesReducer,
});
