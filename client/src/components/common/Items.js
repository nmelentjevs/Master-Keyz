import React, { Component } from 'react';
import './card.scss';
import './pagination.scss';
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

  componentWillMount() {
    const startingPage = this.props.startingPage ? this.props.startingPage : 1;
    const { items } = this.props.items;
    const pageSize = this.props.pageSize;
    let pageCount = parseInt(items.length / pageSize);
    if (items.length % pageSize > 0) {
      pageCount++;
    }
    this.setState({
      currentPage: startingPage,
      pageCount: pageCount
    });
  }

  setCurrentPage(num) {
    this.setState({ currentPage: num });
  }

  createPaginatedData = () => {
    const { items } = this.props.items;
    const pageSize = this.props.pageSize;
    const currentPage = this.state.currentPage;
    const upperLimit = currentPage * pageSize;
    const dataSlice = items.slice(upperLimit - pageSize, upperLimit);
    return dataSlice;
  };

  createControls() {
    let controls = [];
    const pageCount = this.state.pageCount;
    for (let i = 1; i <= pageCount; i++) {
      const baseClassName = 'pagination-controls__button';
      const activeClassName =
        i === this.state.currentPage ? `${baseClassName}--active` : '';
      controls.push(
        <div
          className={`${baseClassName} ${activeClassName}`}
          onClick={() => this.setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }
    return controls;
  }

  render() {
    const { loading } = this.props.items;
    const items = this.createPaginatedData();
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
                      key={item._id}
                      name={item.name}
                      artist={item.artist}
                      category={item.category}
                      price={item.price}
                      id={item._id}
                      type={'add'}
                      property={'collection'}
                      className={item.category}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination-controls">{this.createControls()}</div>
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

Items.defaultProps = {
  pageSize: 6,
  startingPage: 1
};

const mapStateToProps = state => ({
  items: state.items,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getItems }
)(Items);
