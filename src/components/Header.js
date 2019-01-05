import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import FilterBar from './FilterBar';
import SortBar from './SortBar';
import '../css/Header.css';
class Header extends Component {
  componentWillMount() {}

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

  render() {
    return (
      <div className="todo-header">
        <FilterBar
          resetFilter={this.props.resetFilter}
          setFilter={this.props.setFilter}
          filters={this.props.filters}
        />
        <SortBar setSort={this.props.setSort} />
        <button
          type="submit"
          onClick={() => this.props.toggleCompleted()}
        >
          Toggle Completed
        </button>
      </div>
    );
  }
}

export default withFirebase(Header);
