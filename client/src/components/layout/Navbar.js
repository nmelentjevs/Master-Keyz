import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './navbar.scss';

import Cart from './Cart';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      showDropdown: false
    };
  }

  expand = () => {
    this.setState({ showDropdown: true });
    document.getElementById('myDropdown').classList.toggle('show');
  };
  collapse = () => {
    this.setState({ showDropdown: false });
    document.getElementById('myDropdown').classList.remove('show');
  };

  onItemClick = () => {
    const toggle = document.getElementById('toggle');
    toggle.checked = !toggle.checked;
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { basket } = this.props.cart;
    return (
      <div>
        <nav>
          <label
            htmlFor="toggle"
            style={{ color: 'white', fontSize: '1.5rem' }}
          >
            &#9776;
          </label>
          <input type="checkbox" id="toggle" />
          <div className="navbar container">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="nav-logo">
                <span> MK </span>{' '}
              </div>
            </Link>
            <div className="nav-items">
              <ul className="nav-list-items">
                <li onClick={this.onItemClick} className="nav-list-item">
                  <Link to="/collection">Collection</Link>
                </li>
                <li onClick={this.onItemClick} className="nav-list-item">
                  <Link to="/about">About</Link>
                </li>
                <li onClick={this.onItemClick} className="nav-list-item">
                  <Link to="/contact">Contact</Link>
                </li>
                {isAuthenticated ? (
                  <li
                    onClick={this.onItemClick}
                    className="nav-list-item card-icon"
                  >
                    <Link to="/account">
                      <i
                        className="far fa-user"
                        style={{
                          color: 'white',
                          fontSize: '1.2rem'
                        }}
                      />
                    </Link>
                  </li>
                ) : (
                  <li onClick={this.onItemClick} className="nav-list-item">
                    <Link to="/login">Login</Link>
                  </li>
                )}

                <li>
                  <div className="dropdown">
                    <button onClick={this.expand} className="dropicon">
                      <div id="cart">
                        <span
                          className="p1 fa-stack has-badge"
                          data-count={basket.length}
                        >
                          <i
                            className="far fa-credit-card"
                            style={{ color: 'white', fontSize: '1.3rem' }}
                          />
                        </span>
                      </div>
                    </button>

                    <div
                      id="myDropdown"
                      className="dropdown-content"
                      onBlur={this.collapse}
                      tabIndex="0"
                    >
                      <Cart />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth, cart: state.cart });

export default connect(
  mapStateToProps,
  {}
)(Navbar);
