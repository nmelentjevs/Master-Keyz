import React, { Component } from 'react';
import './card.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/itemsActions';

import Spinner from './Spinner';
import Item from './Item';
import SelectList from './SelectList';

class Items extends Component {
  constructor() {
    super();
    this.state = {
      categoryFilter: 'All',
      otherFilter: 'Popular'
    };
  }
  onCategoryChange = e => {
    this.setState({ categoryFilter: e.target.value });
  };
  onOtherChange = e => {
    this.setState({ otherFilter: e.target.value, ready: 1 });
  };

  componentDidMount() {}
  render() {
    const { items, loading } = this.props.items;
    const { errors } = this.props;
    const { categoryFilter, otherFilter } = this.state;
    let itemContent;
    const categoryOptions = [
      {
        label: 'All',
        value: 'All'
      }
    ];
    const options = [
      {
        label: 'Recent',
        value: 'Recent'
      },
      {
        label: 'Price',
        value: 'Price'
      },
      {
        label: 'Popular',
        value: 'Popular'
      }
    ];

    items.forEach(item => {
      categoryOptions.push({ label: item.category, value: item.category });
    });

    const filteredItems = items.filter(item => {
      return item.category === categoryFilter;
    });

    const priceFiltered = [...items].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );

    const uniqueCategory = categoryOptions
      .map(e => e['label'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => categoryOptions[e])
      .map(e => categoryOptions[e]);

    uniqueCategory.sort(function(a, b) {
      var textA = a.label.toUpperCase();
      var textB = b.label.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    if (items == null || loading) {
      itemContent = <Spinner />;
    } else {
      itemContent = (
        <div className="collection-items-wrapper">
          {' '}
          <div className="select-list">
            <div className="select-list-item">
              <SelectList
                placeholder="Status"
                name="status"
                value={categoryFilter}
                onChange={this.onCategoryChange}
                options={uniqueCategory}
                error={errors.status}
              />
            </div>
            <div className="select-list-item">
              <SelectList
                placeholder="Status"
                name="status"
                onChange={this.onOtherChange}
                options={options}
                error={errors.status}
                value={otherFilter}
              />
            </div>
          </div>
          <div className="items-grid">
            {(categoryFilter === 'All'
              ? otherFilter === 'Recent'
                ? items.reverse()
                : otherFilter === 'Price'
                ? priceFiltered
                : items
              : otherFilter === 'Popular'
              ? filteredItems.reverse()
              : filteredItems
            ).map(item => {
              return (
                <div className="item-wrap" key={item._id}>
                  <div key={item._id} className="item hover panel">
                    <Item
                      name={item.name}
                      artist={item.artist}
                      category={item.category}
                      price={item.price}
                      id={item._id}
                      type={'add'}
                      property={'collection'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
