import { combineReducers } from 'redux';
import EventsReducer from './reducer_events';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  events: EventsReducer,
  users: UsersReducer
});

export default rootReducer;
