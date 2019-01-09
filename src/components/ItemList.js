import React, { Component } from 'react';
import ToDoItem from './TodoItem';
class ItemList extends Component {
  render() {
    // if there are items create todoitems to render, otherwise don't render anything
    let todoItems = null;
    if (this.props.items) {
      todoItems = this.props.items.map(cat => (
        // change the null category to n/a for display purposes

        <div className="item-list">
          <h3 className="category">{cat[0]}</h3>
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
    }

    return <div>{todoItems}</div>;
  }
}

export default ItemList;
