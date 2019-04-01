import React, { Component } from 'react';
// import Collection from './landing-components/Collection';
// import Gallery from './landing-components/Gallery';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, clearCurrentProfile } from '../../actions/authActions';
import { getItems } from '../../actions/itemsActions';

import Items from '../common/Items';
import Img from 'react-image';

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
  }

  render() {
    const { items } = this.props.items;
    return (
      <div className="main-container">
        <div id="main">
          <img
            src={require('../../img/pTeE24g.jpg')}
            width="100%"
            height="500px"
          />
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
  { logoutUser, clearCurrentProfile, getItems }
)(Landing);
