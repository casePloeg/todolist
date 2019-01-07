import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import SortWithDropDown from './SortWithDropDown.js';
import FilterWithDropDown from './FilterWithDropDown.js';

import '../css/Header.css';
class Header extends Component {
  componentWillMount() {}

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */

  render() {
    return (
      <div className="todo-header">
        <FilterWithDropDown
          setFilter={this.props.setFilter}
          filters={this.props.filters}
          resetFilter={this.props.resetFilter}
        />
        <SortWithDropDown setSort={this.props.setSort} />
        <div>
          <button
            type="submit"
            onClick={() => this.props.toggleCompleted()}
          >
            Complete
          </button>
        </div>
      </div>
    );
  }
}

export default withFirebase(Header);
