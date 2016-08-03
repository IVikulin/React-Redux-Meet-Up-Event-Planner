import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent } from '../actions/index';
import { Link } from 'react-router';


class EventDetail extends Component {
  componentWillMount() {
    this.props.getEvent(this.props.params.id);
  }

  render() {
    if (!this.props.data) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="component_get_event">
        <h1>{ this.props.data.eventname }</h1>
        <h2>{ this.props.data.type }</h2>
        <hr />
        <p>Host: <b>{ this.props.data.host }</b></p>
        <p>Location: <b>{ this.props.data.location }</b></p>
        <p>Start: <b>{ this.props.data.startdate } { this.props.data.starttime }</b></p>
        <p>End: <b>{ this.props.data.enddate } { this.props.data.endtime }</b></p>
        <p>Message: <b>{ this.props.data.msg }</b></p>
        {(() => {
          if (this.props.data.guests) {
            return (this.props.data.guests.map(
              (guest) => { return( <p key={ guest }>Guest: <b>{ guest }</b></p> ) }
            ));
          }
        })()}
        <p>
          <Link className="btn btn-info btn-lg btn-margin" to="/">All events</Link>
          <Link className="btn btn-info btn-lg btn-margin" to="/events/new">Add Event</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.events.data };
}

export default connect(mapStateToProps, { getEvent })(EventDetail);
