import React, { Component } from 'react';
// import Collection from './landing-components/Collection';
// import Gallery from './landing-components/Gallery';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, clearCurrentProfile } from '../../actions/authActions';
import { getItems } from '../../actions/itemsActions';

import Items from '../common/Items';
import Cart from '../../components/layout/Cart';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({ items: this.props.items });
    }
  }
  render() {
    const { items } = this.props.items;
    return (
      <div>
        <h1>Hello</h1>
        <a href="/login" className="nav-link">
          <button onClick={this.getItems}>Get Items</button>
          <button onClick={this.onLogoutClick}> Logout </button>
        </a>
        <Items items={items} />
        <Cart />
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
