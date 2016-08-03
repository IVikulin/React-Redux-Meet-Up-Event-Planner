import { LOGIN, REGISTER } from '../actions/index';

const INITIAL_STATE = { list: [], data: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.payload };
    case REGISTER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
