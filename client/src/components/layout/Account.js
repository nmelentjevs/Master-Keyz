import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserItems } from '../../actions/itemsActions';
import { logoutUser, clearCurrentProfile } from '../../actions/authActions';

import UserItems from '../common/UserItems';

class Account extends Component {
  componentDidMount() {
    this.props.getCurrentUserItems(this.props.auth.user.email);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { userItems } = this.props.items.purchased;
    return (
      <div>
        <UserItems items={userItems} />
        <button onClick={this.onLogoutClick}>Logout</button>
      </div>
    );
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  getCurrentUserItems: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    items: state.items
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUserItems, logoutUser, clearCurrentProfile }
)(Account);
