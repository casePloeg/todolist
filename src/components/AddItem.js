import React, { Component } from 'react';

class AddItem extends Component {
  search(e) {
    if (e.key === 'Enter') {
      const todayObj = new Date();
      const todayStr =
        todayObj.getFullYear() +
        '-' +
        (todayObj.getMonth() + 1) +
        '-' +
        todayObj.getDate();

      console.log();
      this.props.handleNewItem(todayStr, e.target.value);
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
