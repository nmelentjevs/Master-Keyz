import React, { Component } from 'react';
// import './login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="login">
        <h1>Register</h1>
        <form method="post" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required="required"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required="required"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required="required"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            required="required"
            value={this.state.password2}
            onChange={this.onChange}
          />

          <button type="submit" className="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
