import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, errorAdding } from '../../actions/cartActions';
import { setButtonLoading } from '../../actions/paymentActions';
import isEmpty from '../../validation/is-empty';

import Moment from 'react-moment';
import Img from 'react-image';

class Item extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      isHovered: false
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

  pdfPreview = () => {
    console.log('here i am pdf');
  };

  handleHover = () => {
    this.setState({
      isHovered: !this.state.isHovered
    });
  };

  render() {
    const { name, artist, category, price } = this.props;
    const { purchaseDate } = this.props;
    const { property } = this.props;
    const btnClass = this.state.isHovered ? 'hover panel flip' : 'hover panel';
    return (
      <div
        className={btnClass}
        onMouseEnter={property === 'collection' ? this.handleHover : null}
        onMouseLeave={property === 'collection' ? this.handleHover : null}
      >
        <div className="front item-grid">
          <div>
            <Img
              className="item-img"
              width="20%"
              src="https://media.istockphoto.com/photos/stairway-to-heaven-picture-id533367857"
            />
          </div>
          <div className="item-info">
            <h4> {name}</h4>
            <h4>--By {artist}</h4>
            <h4 className="item-category">{category}</h4>
            <h4>{price}£</h4>
            {purchaseDate === undefined ? null : (
              <h3>
                Purchased on:{' '}
                <Moment format="YYYY/MM/DD">{purchaseDate}</Moment>
              </h3>
            )}
            {this.props.type === 'add' ? (
              <span className="button-text" style={{ textStyle: 'uppercase' }}>
                Hover For Info
              </span>
            ) : null}
          </div>
        </div>
        <div className="back">
          <div className="backTitle">{name}</div>

          <div className="backParagraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iusto
            sed odio nobis amet eveniet?
          </div>
          <button className="add-button" onClick={() => this.pdfPreview()}>
            Preview
          </button>
          <button className="add-button" onClick={() => this.addToBasket()}>
            Purchase
          </button>

          <div className="backGoto">
            <a
              href="https://www.youtube.com/watch?v=zvJJ8G9oBrE"
              target="_blank"
              title="Youtube Video"
              rel="noopener noreferrer"
            >
              Youtube Video →
            </a>
          </div>
        </div>
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
