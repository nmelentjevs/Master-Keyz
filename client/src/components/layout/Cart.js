import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/cartActions';
import { addItems } from '../../actions/itemsActions';
import {
  paymentAccepted,
  paymentCancelled,
  paymentError
} from '../../actions/paymentActions';
import { paypalClientID } from '../../config/googleKeys';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import Spinner from '../common/Spinner';

class Cart extends Component {
  editCart() {
    this.props.editCart();
  }
  deleteItem = (id, price) => {
    this.props.deleteItem(id, price);
  };

  onSuccess = payment => {
    const { basket } = this.props.cart;
    const { user } = this.props.auth;
    const userItems = {
      basket,
      user
    };
    this.props.paymentAccepted(payment);
    this.props.addItems(userItems);
    this.props.history.push('/thankyou');
  };

  onCancel = data => {
    this.props.paymentCancelled(data);
  };

  onError = err => {
    this.props.paymentError(err);
  };

  render() {
    const client = {
      currency: 'GBP',
      sandbox: paypalClientID,
      production: 'YOUR-PRODUCTION-APP-ID'
    };
    const { basket, total } = this.props.cart;
    const { loading } = this.props.paid;
    const redirect_urls = {
      return_url: 'http://localhost:3000/pay/thankyou',
      cancel_url: 'http://localhost:3000/pay/cancel'
    };
    parseFloat(total).toFixed(2);
    return (
      <div className="basket">
        {total !== 0 ? (
          <div>
            {basket.map(item => {
              return (
                <div key={item.id} className="basket-item">
                  <div className="basket-item-info">
                    <p>{item.name}</p>
                    <p>{item.price}£</p>
                  </div>
                  <button
                    className="dropicon"
                    href="#"
                    onClick={() => this.deleteItem(item.id, item.price)}
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                </div>
              );
            })}
            <p> Total: {total}£</p>
            {loading ? (
              <Spinner />
            ) : (
              <PaypalExpressBtn
                client={client}
                currency={client.currency}
                total={parseFloat(total)}
                onError={this.onError}
                onSuccess={this.onSuccess}
                onCancel={this.onCancel}
                redirect_urls={redirect_urls}
              />
            )}
          </div>
        ) : (
          <div className="basket">
            <p> No items </p>
            <p> Total: {total}</p>
          </div>
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  errors: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
  paymentAccepted: PropTypes.func.isRequired,
  paymentCancelled: PropTypes.func.isRequired,
  paymentError: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  items: state.items,
  cart: state.cart,
  paid: state.paid
});

export default connect(
  mapStateToProps,
  {
    deleteItem,
    paymentAccepted,
    paymentCancelled,
    paymentError,
    addItems
  }
)(Cart);
