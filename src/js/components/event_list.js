import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchEvents } from '../actions/index';


class EventList extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  renderList() {
    return (this.props.events.map((elem) => {
      return (
        <Link key={elem.id} to={`events/${elem.id}`} className="list-group-item">
          <span className="label label-info label-pill pull-xs-right">{ elem.startdate }</span>
          { elem.type }: <b>{ elem.eventname }</b>
        </Link>
      )
    }))
  }

  render() {
    return (
      <div className="component_event_list">
        <h1>Comming events</h1>
        <div className="list-group">
          {this.renderList()}
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { events: state.events.list };
};

export default connect(mapStateToProps, { fetchEvents })(EventList);
