import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EventList from './components/event_list';
import EventDetail from './components/event_detail';
import CreateEvent from './components/create_event';
import Sign from './components/sign';

export default (
  <Route path="/" component={App} >
    <IndexRoute name="event_list" component={EventList} />
    <Route name="create_event" path="events/new" component={CreateEvent} />
    <Route name="event_detail" path="events/:id" component={EventDetail} />
    <Route name="sign" path="sign" component={Sign} />
  </Route>
);
