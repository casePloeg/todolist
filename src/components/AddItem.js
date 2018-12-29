import React, { Component } from 'react';

class AddItem extends Component {
  search(e) {
    if (e.key === 'Enter') {
      this.props.handleNewItem(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div className="todo-item">
        <input type="text" onKeyPress={event => this.search(event)} />
      </div>
    );
  }
}

export default AddItem;
