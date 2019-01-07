import React, { Component } from 'react';
import '../css/ToDoItem.css';

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    if (this.props.item.completed) {
      this.state = { itemClass: 'completed' };
    } else {
      this.state = { itemClass: 'show' };
    }
  }

  handleChange(id) {
    let itemClass = '';
    if (this.state.itemClass === 'show') {
      itemClass = 'completed';
    } else {
      itemClass = 'show';
    }
    this.setState(prevState => {
      prevState.itemClass = itemClass;
      return prevState;
    });
    this.props.handleChange(id, itemClass);
  }

  render() {
    return (
      <div className={'todo-item ' + this.state.itemClass}>
        <input
          type="checkbox"
          checked={this.props.item.completed}
          onChange={() => this.handleChange(this.props.item.id)}
        />
        <div className={'list-text'}>
          <p>{this.props.item.text}</p>
        </div>

        <div className="list-buttons">
          <button
            type="submit"
            onClick={() => this.props.deleteItem(this.props.item.id)}
          >
            Edit
          </button>

          <button
            type="submit"
            onClick={() => this.props.deleteItem(this.props.item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ToDoItem;
