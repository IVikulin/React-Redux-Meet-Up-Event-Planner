import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../actions/index';
import serialize from 'form-serialize';
import { Link } from 'react-router';


class CreateEvent extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      guests: 1
    };
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createEvent( serialize(event.target, {hash: true}) )
    .then( this.context.router.push('/') );
  };

  numGuest = (event) => {
    event.preventDefault();
    if (event.target.getAttribute("data-action") === 'add') {
      this.setState({ guests: this.state.guests + 1 });
    } else {
      this.setState({ guests: this.state.guests <= 0 ? 0 : this.state.guests - 1 });
    }
  }

  renderGuestFields() {
    const inputs = [...Array(this.state.guests).keys()];
    return (
      inputs.map((elem) => {
        return (
          <div className="form-group row" key={`guests[${elem}]`}>
            <div className="col-xs-12 offset-md-4 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state[`guests[${elem}]`]}
                name={`guests[${elem}]`}
                type="text"
                id={`guests[${elem}]`}
                className="form-control form-control-lg"
                placeholder="Guest name" />
            </div>
          </div>
        );
      })
    );
  };

  render() {
    return (
      <div className="component_create_event">

        <datalist id="event-type">
          <option value="Birthday" />
          <option value="Graduation" />
          <option value="Christmas Day" />
          <option value="New Year" />
          <option value="Weekend" />
          <option value="Thanksgiving Day" />
          <option value="Halloween" />
          <option value="Martin Luther King, Jr. Day" />
          <option value="Memorial Day" />
          <option value="Independence Day" />
          <option value="Labor Day" />
          <option value="Columbus Day" />
          <option value="Veterans Day" />
          <option value="George Washington’s Birthday" />
          <option value="Veterans Day" />
        </datalist>

        <h1>New Event</h1>
        <form ref="form" className="jumbotron" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="form-name" className="col-xs-12 col-md-4 form-control-label">Event name:</label>
            <div className="col-xs-12 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state.eventname}
                name="eventname"
                id="form-name"
                type="text"
                className="form-control form-control-lg"
                placeholder="Night Party"
                required
                autoFocus />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="form-type" className="col-xs-12 col-md-4 form-control-label">Event type:</label>
            <div className="col-xs-12 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state.type}
                name="type"
                id="form-type"
                type="text"
                list="event-type"
                className="form-control form-control-lg"
                placeholder="Birthday"
                required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="form-host" className="col-xs-12 col-md-4 form-control-label">Event host:</label>
            <div className="col-xs-12 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state.host}
                name="host"
                id="form-host"
                type="text"
                className="form-control form-control-lg"
                placeholder="Jessy James"
                autoComplete="name"
                required />
            </div>
          </div>

          <div className="form-group row">
            <span className="col-xs-12 col-md-4 form-control-label">
              <label htmlFor="form-startdate">Event start date</label> <label htmlFor="form-starttime">and time:</label>
            </span>
            <div className="col-xs-12 col-md-5">
              <input
                onChange={this.handleChange}
                value={this.state.startdate}
                required
                type="date"
                className="form-control form-control-lg"
                name="startdate"
                id="form-startdate"
                placeholder="05/05/16" />
            </div>
            <div className="col-xs-12 col-md-3">
              <input
                onChange={this.handleChange}
                value={this.state.starttime}
                required
                type="time"
                className="form-control form-control-lg"
                name="starttime"
                id="form-starttime"
                placeholder="12:30 AM" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="form-end" className="col-xs-12 col-md-4 form-control-label">Event end date and time:</label>
            <div className="col-xs-12 col-md-5">
              <input
                onChange={this.handleChange}
                value={this.state.enddate}
                required
                type="date"
                className="form-control form-control-lg"
                name="enddate"
                id="form-end"
                placeholder="05/05/16" />
            </div>
            <div className="col-xs-12 col-md-3">
              <input
                onChange={this.handleChange}
                value={this.state.endtime}
                required
                type="time"
                className="form-control form-control-lg"
                name="endtime"
                id="form-end2"
                placeholder="12:30 PM" />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="form-location" className="col-xs-12 col-md-4 form-control-label">Location:</label>
            <div className="col-xs-12 col-md-8">
              <input
              onChange={this.handleChange}
              value={this.state.location}
              type="text"
              className="form-control form-control-lg"
              name="location"
              id="form-location"
              placeholder="540 Howard St, San Francisco, CA 94105"
              required />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 col-md-4 form-control-label">Guest list:</div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <a onClick={this.numGuest} data-action="add" className="btn btn-success btn-lg btn-block">Add Guest</a>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <a onClick={this.numGuest} data-action="del" className="btn btn-warning btn-lg btn-block">Remove Guest</a>
            </div>
          </div>

          <div className="guests">
            {this.renderGuestFields()}
          </div>

          <div className="form-group row">
            <label htmlFor="form-msg" className="col-xs-12 col-md-4 form-control-label">Additional information:</label>
            <div className="col-xs-12 col-md-8">
              <textarea
                onChange={this.handleChange}
                value={this.state.msg}
                width="100%"
                className="form-control form-control-lg"
                name="msg"
                id="form-msg"
                placeholder="Ex. Dress Code! Only Black and white clothes."
                rows="3"></textarea>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 col-md-8 offset-md-4">
              <button type="submit" value="Post" className="btn btn-info btn-lg btn-margin-bottom btn-margin-right">Create Event</button>
              <Link to="/" className="btn btn-danger btn-lg btn-margin-bottom">Cancel</Link>
            </div>
          </div>

        </form>
      </div>
    );
  }
}


export default connect(null, { createEvent })(CreateEvent);
