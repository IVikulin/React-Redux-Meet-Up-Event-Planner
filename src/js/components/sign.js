import React, { Component } from 'react';
import { Link } from 'react-router';
import serialize from 'form-serialize';
import { login, register } from '../actions/index';
import { connect } from 'react-redux';

class Sign extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);

    this.state = {
      registration: false,
      password_type: 'password',
      target_name: 'Login',
      visability: { display: 'none' }
    };
  };

  onCheckboxChange = (event) => {
    if (event.target.checked) {
      this.setState({
        registration: event.target.value,
        target_name: 'Register',
        visability: { display: 'block' }
      });
    } else {
      this.setState({
        registration: event.target.value,
        target_name: 'Login',
        visability: { display: 'none' }
      });
    };
  };

  onPasswordClick = () => {
    this.setState({
      password_type: this.state.password_type === 'password' ? 'text' : 'password'
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.target_name === 'Login') {
      this.props.login( serialize(event.target, {hash: true}) )
      .then( this.context.router.push('/events/new') );
    } else {
      this.props.register( serialize(event.target, {hash: true}) )
      .then( this.context.router.push('/events/new') );
    }
  };

  render() {
    return (
      <div className="component_sign">
        <h1>Login / Registration</h1>
        <form className="jumbotron" onSubmit={this.handleSubmit}>

          <div className="form-group row">
            <div className="col-xs-12 col-md-8 offset-md-4">
              <label className="custom-control custom-checkbox">
                <input
                  onChange={this.onCheckboxChange}
                  defaultChecked={this.state.registration}
                  name="registration"
                  type="checkbox"
                  className="custom-control-input" />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  I would like to register
                </span>
              </label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-xs-12 col-md-4 form-control-label">Email:</label>
            <div className="col-xs-12 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
                type="email"
                id="email"
                autoComplete="email"
                className="form-control form-control-lg"
                placeholder="mail@example.com"
                required
                autoFocus />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-xs-12 col-md-4 form-control-label">Password:</label>
            <div className="col-xs-12 col-md-8">
              <div className="input-group">
                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  type={this.state.password_type}
                  name="password"
                  id="password"
                  autoComplete="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  required />
                <div onClick={this.onPasswordClick} className="input-group-addon password-shower">
                  👁
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row" style={this.state.visability}>
            <label htmlFor="name" className="col-xs-12 col-md-4 form-control-label">Name:</label>
            <div className="col-xs-12 col-md-8">
              <input
                onChange={this.handleChange}
                value={this.state.name}
                name="name"
                id="name"
                type="text"
                autoComplete="name"
                className="form-control form-control-lg"
                placeholder="Ivan Ivanov" />
            </div>
          </div>

          <div className="form-group row" style={this.state.visability}>
            <label htmlFor="msg" className="col-xs-12 col-md-4 form-control-label">Additional information:</label>
            <div className="col-xs-12 col-md-8">
              <textarea
                onChange={this.handleChange}
                value={this.state.msg}
                name="msg"
                id="msg"
                width="100%"
                className="form-control form-control-lg"
                placeholder="Some infromation about you"
                rows="3"></textarea>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-xs-12 col-md-8 offset-md-4">
              <button type="submit" className="btn btn-info btn-lg btn-margin-bottom btn-margin-right">{this.state.target_name}</button>
              <Link to="/" className="btn btn-danger btn-lg btn-margin-bottom">Cancel</Link>
            </div>
          </div>

        </form>
      </div>
    );
  }
}


export default connect(null, { login, register })(Sign);
