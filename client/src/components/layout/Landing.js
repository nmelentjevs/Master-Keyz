import React, { Component } from 'react';
// import Collection from './landing-components/Collection';
// import Gallery from './landing-components/Gallery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, clearCurrentProfile } from '../../actions/authActions';
import { getItems, getCurrentUserItems } from '../../actions/itemsActions';

class Landing extends Component {
  getItems = e => {
    e.preventDefault();
    this.props.getItems();
    this.setState({ items: this.props.items });
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.getItems();
    this.props.getCurrentUserItems(this.props.auth.user.email);
  }

  render() {
    return (
      <div className="main-container">
        <div id="main">
          <h1 className="main-display">
            We Make
            <span className="gold"> Music</span> Happen
          </h1>
          <Link to="/collection" className="collection-link">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    items: state.items
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getItems, getCurrentUserItems }
)(Landing);
