import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserItems from '../common/UserItems';
import { getCurrentUserItems } from '../../actions/itemsActions';

class Account extends Component {
  componentDidMount() {
    this.props.getCurrentUserItems(this.props.auth.user.email);
  }

  render() {
    const { userItems } = this.props.items.purchased;
    return (
      <div>
        <UserItems items={userItems} />
      </div>
    );
  }
}

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  getCurrentUserItems: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    items: state.items
  };
};

export default connect(
  mapStateToProps,
  { getCurrentUserItems }
)(Account);
