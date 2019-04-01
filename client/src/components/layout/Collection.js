import React, { Component } from 'react';
// import Collection from './landing-components/Collection';
// import Gallery from './landing-components/Gallery';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, clearCurrentProfile } from '../../actions/authActions';
import { getItems } from '../../actions/itemsActions';

import Items from '../common/Items';

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
    return <Items items={items} />;
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
