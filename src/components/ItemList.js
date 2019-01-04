import React, { Component } from 'react';

class ItemList extends Component {
  render() {
    return <div>{this.props.items}</div>;
  }
}

export default ItemList;
