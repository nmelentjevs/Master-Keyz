import React, { Component } from 'react';
// import './login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, registerUser, googleAuth } from '../../actions/authActions';
import { GoogleLogin } from 'react-google-login';
import { googleClientID } from '../../config/googleKeys';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      redirect: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  signup(res, type) {}

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const responseGoogle = response => {
      const { email, name, googleId } = response.profileObj;
      const { history } = this.props;
      const newUser = {
        email,
        name,
        googleId
      };
      this.props.registerUser(newUser);
      this.props.loginUser(newUser, history);
      this.props.history.push('/');
    };

    return (
      <div className="login">
        <h1>Login</h1>
        <form method="post" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required="required"
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required="required"
            onChange={this.onChange}
          />
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
        </form>

        <GoogleLogin
          clientId={googleClientID}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-primary btn-block btn-large"
            >
              Login with Google
            </button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  googleAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, googleAuth, registerUser }
)(Login);
