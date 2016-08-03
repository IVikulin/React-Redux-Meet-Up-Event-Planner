import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div className="row">

        <div className="col-xs-12">
          <nav className="navbar navbar-light bg-faded">
            <a className="navbar-brand" href="#"><b>Event</b><i>Planner</i></a>
            <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#CollapsingNavbar">
              &#9776;
            </button>
            <div className="collapse navbar-toggleable-xs" id="CollapsingNavbar">
              <ul className="nav navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="events/new" activeClassName="active">Add event</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="sign" activeClassName="active">Login / Registration</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="col-xs-12">
          {this.props.children}
        </div>

      </div>
    );
  }
}
