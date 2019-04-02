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
    const itemClass = `item-category ${'category-' + category.toLowerCase()}`;
    const btnClass = this.state.isHovered ? 'hover panel flip' : 'hover panel';
    return (
      <div
        className={btnClass}
        onMouseEnter={property === 'collection' ? this.handleHover : null}
        onMouseLeave={property === 'collection' ? this.handleHover : null}
      >
        <div
          className={
            property === 'user' ? 'front user-item-grid' : 'front item-grid'
          }
        >
          <div>
            <Img
              className="item-img"
              width="20%"
              src="https://media.istockphoto.com/photos/stairway-to-heaven-picture-id533367857"
            />
          </div>
          <div className="item-info">
            <button className={itemClass}>{category}</button>
            <h4
              style={
                (name.length > 15) & (property === 'collection')
                  ? { fontSize: '1.2rem' }
                  : null
              }
            >
              {' '}
              {name}
            </h4>
            <h4 className="artist-name">--By {artist}</h4>
            <h4 className="item-price">{price}£</h4>
            {this.props.type === 'add' ? (
              <span className="button-text" style={{ textStyle: 'uppercase' }}>
                Hover For Info
              </span>
            ) : null}
            {purchaseDate === undefined ? null : (
              <h4>
                Purchased on:{' '}
                <Moment format="YYYY/MM/DD">{purchaseDate}</Moment>
              </h4>
            )}
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
