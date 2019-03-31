import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/itemsActions';

import Spinner from './Spinner';
import Item from './Item';

class Items extends Component {
  render() {
    const { items, loading } = this.props.items;
    let itemContent;
    if (items == null || loading) {
      itemContent = <Spinner />;
    } else {
      itemContent = (
        <div className="item-grid">
          {items.map(item => {
            return (
              <div key={item._id} className="item">
                <Item
                  name={item.name}
                  artist={item.artist}
                  category={item.category}
                  price={item.price}
                  id={item._id}
                  type={'add'}
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

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getItems }
)(Items);
