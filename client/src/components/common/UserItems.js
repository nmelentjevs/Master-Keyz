import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserItems } from '../../actions/itemsActions';

import Spinner from './Spinner';
import Item from './Item';

class UserItems extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }

  render() {
    const { purchased, loading } = this.props.items;
    const unique = purchased
      .map(e => e.item['name'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => purchased[e])
      .map(e => purchased[e])
      .reverse();

    let itemContent;
    if (purchased == null || loading) {
      itemContent = <Spinner />;
    } else {
      itemContent = (
        <div className="user-items-grid">
          {unique.map(item => {
            return (
              <div key={item._id} className="user-item">
                <Item
                  name={item.item.name}
                  artist={item.item.artist}
                  category={'ok'}
                  price={item.item.price}
                  purchaseDate={item.purchaseDate}
                  id={item.item.id}
                  property={'user'}
                />
              </div>
            );
          })}
        </div>
      );
    }
    return <div className="container">{itemContent}</div>;
  }
}

UserItems.propTypes = {
  getCurrentUserItems: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  items: state.items,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentUserItems }
)(UserItems);
