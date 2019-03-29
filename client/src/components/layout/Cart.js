import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editCart, pay } from '../../actions/cartActions';
import { paypalClientID, paypalClientSecret } from '../../config/googleKeys';

import PaypalExpressBtn from 'react-paypal-express-checkout';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      total: {}
    };
  }
  editCart() {
    this.props.editCart();
  }
  deleteItem = (id, price) => {
    this.props.deleteItem(id, price);
  };

  pay = total => {
    this.props.pay(total);
  };

  onSuccess = payment => {
    // Congratulation, it came here means everything's fine!
    console.log('The payment was succeeded!', payment);
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onCancel = data => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  };

  onError = err => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log('Error!', err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  };
  render() {
    const env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'GBP'; // or you can set this value from your props or state

    const client = {
      sandbox: paypalClientID,
      production: 'YOUR-PRODUCTION-APP-ID'
    };
    const { basket, total } = this.props.cart;
    return (
      <div className="basket">
        <h1>Cart</h1>
        <div className="basket-grid">
          {basket.map(item => {
            return (
              <div key={item.id} className="basket-item">
                <div className="basket-item-info">
                  <p>{item.name}</p>
                  <p>{item.artist}</p>
                  <p>{item.price}</p>
                </div>
                <button onClick={() => this.deleteItem(item.id, item.price)}>
                  Remove Item
                </button>
              </div>
            );
          })}
          <h1>Total: {total}</h1>
          <button id="pay" onClick={() => this.pay(total, basket)}>
            {' '}
            Pay{' '}
          </button>
          <PaypalExpressBtn client={client} currency={'GBP'} total={total} />
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  errors: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  pay: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  items: state.items,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { editCart, deleteItem, pay }
)(Cart);
