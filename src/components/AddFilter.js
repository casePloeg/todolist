import React, { Component } from 'react';

class AddItem extends Component {
  search(e) {
    if (e.key === 'Enter') {
      this.props.handleNewFilter(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div className="todo-add">
        <h2>Add a filter:</h2>
        <input type="text" onKeyPress={event => this.search(event)} />
      </div>
    );
  }
}

export default AddItem;
