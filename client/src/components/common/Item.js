import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, errorAdding } from '../../actions/cartActions';
import { setButtonLoading } from '../../actions/paymentActions';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  addToBasket = () => {
    const { basket } = this.props.cart;
    const newBasketItem = {
      name: this.props.name,
      artist: this.props.artist,
      price: this.props.price,
      category: this.props.category,
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
    const { name, artist, category, price } = this.props;
    const { purchaseDate } = this.props;
    return (
      <div>
        <h1>{name}</h1>
        <h1>{artist}</h1>
        <h1>{category}</h1>
        <h1>{price}£</h1>
        {purchaseDate === undefined ? null : (
          <h3>
            Purchased on: <Moment format="YYYY/MM/DD">{purchaseDate}</Moment>
          </h3>
        )}
        {this.props.type === 'add' ? (
          <button className="add-button" onClick={() => this.addToBasket()}>
            Purchase
          </button>
        ) : null}
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
  { addItem, errorAdding, setButtonLoading }
)(Item);
