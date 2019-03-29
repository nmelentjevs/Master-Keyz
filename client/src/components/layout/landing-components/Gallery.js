import React, { Component } from 'react';
import './gallery.scss';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  render() {
    return <section className="gallery" />;
  }
}

export default Gallery;
