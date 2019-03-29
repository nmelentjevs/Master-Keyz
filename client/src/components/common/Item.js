import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Item extends Component {
  render() {
    const { name, artist, category, price } = this.props;
    return (
      <div className="item">
        <h1>{name}</h1>
        <h1>{artist}</h1>
        <h1>{category}</h1>
        <h1>{price}</h1>
      </div>
    );
  }
}

Item.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(Item);
