import React, { Component } from 'react';
import Card from '../../common/Card';
import ReactDOM from 'react-dom';
import '../../common/card.scss';

class Collection extends Component {
  state = {
    items: [
      {
        name: 'Beatles',
        price: 11,
        img: '../../img/220px-Beatles_-_Abbey_Road.jpg'
      },
      {
        name: 'Led Zeppellin',
        price: 15,
        img: '/client/src/img/led13.jpg'
      },
      {
        name: 'The Doors',
        price: 18,
        img: '/client/src/img/download.jpeg'
      },
      {
        name: 'The Scorpions',
        price: 20,
        img: '/client/src/img/bb44e2f5d180cbc16eed38ca78236d55.jpg'
      }
    ]
  };

  render() {
    return <section id="collection" />;
  }
}

export default Collection;
