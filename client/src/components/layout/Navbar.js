import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="navbar container">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="nav-logo">
                <span> MK </span>{' '}
                <i
                  className="fa fa-key"
                  style={{
                    fontSize: '30px',
                    transform: 'rotate(-45deg)'
                  }}
                />
              </div>
            </Link>
            <div className="nav-items">
              <ul className="nav-list-items">
                <li className="nav-list-item">
                  <Link to="/Collection">Collection</Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/Gallery">Gallery</Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/About">About</Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/Contact">Contact</Link>
                </li>
                <li className="nav-list-item">
                  <Link to="/Login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
