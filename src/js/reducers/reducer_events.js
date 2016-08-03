import { CREATE_EVENT, FETCH_EVENTS, GET_EVENT } from '../actions/index';

const INITIAL_STATE = { list: [], data: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, data: action.payload };
    case GET_EVENT:
      return { ...state, data: action.payload };
    case FETCH_EVENTS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
