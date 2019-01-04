import React, { Component } from 'react';

class ItemCategory extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.categorey}</h1>
        {this.props.items}
      </div>
    );
  }
}

export default ItemCategory;
