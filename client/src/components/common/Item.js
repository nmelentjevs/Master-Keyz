import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, errorAdding } from '../../actions/cartActions';
import isEmpty from '../../validation/is-empty';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  addToBasket = (id, price) => {
    const { basket } = this.props.cart;
    const newBasketItem = {
      name: this.props.name,
      artist: this.props.artist,
      price: this.props.price,
      id: this.props.id
    };
    if (isEmpty(basket)) {
      this.props.addItem(newBasketItem);
    } else {
      if (
        basket.find(item => {
          return item.id === newBasketItem.id;
        })
      ) {
        this.props.errorAdding({ msg: 'Item is already in the basket' });
      } else {
        this.props.addItem(newBasketItem);
      }
    }
  };

  render() {
    const { name, artist, category, price, _id } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{artist}</h1>
        <h1>{category}</h1>
        <h1>{price}</h1>
        <button onClick={() => this.addToBasket(_id)}>Add Item</button>
      </div>
    );
  }
}

Item.propTypes = {
  errors: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
  errorAdding: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  items: state.items,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { addItem, errorAdding }
)(Item);
