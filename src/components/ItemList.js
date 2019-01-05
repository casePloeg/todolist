import React, { Component } from 'react';
import ToDoItem from './TodoItem';
class ItemList extends Component {
  render() {
    const todoItems = this.props.items.map(cat => (
      // change the null category to n/a for display purposes

      <div>
        <p>{cat[0]}</p>
        {cat.slice(1).map(item => (
          <ToDoItem
            key={item.id}
            item={item}
            handleChange={this.props.handleChange}
            deleteItem={this.props.deleteItem}
          />
        ))}
      </div>
    ));
    return <div>{todoItems}</div>;
  }
}

export default ItemList;
