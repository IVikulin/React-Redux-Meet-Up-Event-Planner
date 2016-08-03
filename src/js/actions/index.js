export const CREATE_EVENT = 'CREATE_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const GET_EVENT    = 'GET_EVENT';
export const REGISTER     = 'REGISTER';
export const LOGIN        = 'LOGIN';


export function createEvent(data) {
  let events = JSON.parse( localStorage.getItem('events') );
  if (!events) {
    data.id = 0;
    events = [data];
    localStorage.setItem('events', JSON.stringify(events));
  } else {
    data.id = events[events.length - 1].id + 1;
    events.push(data);
    localStorage.setItem('events', JSON.stringify(events));
  }

  return {
    type: CREATE_EVENT,
    payload: data
  };
}


export function fetchEvents() {
  let events = JSON.parse( localStorage.getItem('events') );

  if (!events) {
    events = [];
  }

  return {
    type: FETCH_EVENTS,
    payload: events
  };
}


export function getEvent(id) {
  const events = JSON.parse( localStorage.getItem('events') );
  let data;

  if (!events) {
    data = null;
  } else {
    data = events[parseInt(id)]
  }

  return {
    type: GET_EVENT,
    payload: data
  };
}


export function login(data) {
  console.log(data); //
  const user = JSON.parse( localStorage.getItem(data.email) );
  console.log(user); //

  return {
    type: LOGIN,
    payload: user
  };
}


export function register(data) {
  console.log(data); //
  let user = JSON.parse( localStorage.getItem(data.email) );

  if (!user) {
    localStorage.setItem(data.email, JSON.stringify(data));
  } else {
    user = null;
  }
  
  console.log(user); //

  return {
    type: REGISTER,
    payload: user
  };
}
