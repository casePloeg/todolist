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
        <h3>Add a filter:</h3>
        <input type="text" onKeyPress={event => this.search(event)} />
      </div>
    );
  }
}

export default AddItem;
