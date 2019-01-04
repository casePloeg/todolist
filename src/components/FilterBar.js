import React, { Component } from 'react';

class FilterBar extends Component {
  search(e) {
    if (e.key === 'Enter') {
      this.props.setFilter(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div className="todo-item">
        <input type="text" onKeyPress={event => this.search(event)} />
        <button
          type="submit"
          onClick={() => this.props.resetFilter()}
        >
          Clear Filter
        </button>
      </div>
    );
  }
}

export default FilterBar;
