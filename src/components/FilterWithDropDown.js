import React, { Component } from 'react';
import { withDropDown } from './DropDown.js';

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }

  search(e) {
    if (e.key === 'Enter') {
      this.props.setFilter(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    // generate buttons for the drop down based off given filters
    let filterButtons;
    if (this.props.filters) {
      filterButtons = this.props.filters.map(filter => (
        <button
          type="submit"
          onClick={() => {
            this.props.setFilter(filter);
            this.props.showDropDown();
          }}
          onFocus={() => console.log('gained focus')}
        >
          {filter}
        </button>
      ));
    }

    return (
      <div className="todo-filter">
        {/*
        <input type="text" onKeyPress={event => this.search(event)} />
        <button
          type="submit"
          onClick={() => this.props.resetFilter()}
        >
          Clear Filter
        </button>
        */}

        <div className="dropdown">
          <button
            type="submit"
            onClick={() => this.props.showDropDown()}
            onBlur={() => console.log('lost focus')}
            className="dropbtn"
          >
            Filter
          </button>
          <div
            id="myDropdown"
            className={'dropdown-content ' + this.props.dropClass}
          >
            {filterButtons}

            <button
              type="submit"
              onClick={() => this.props.setFilter('')}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withDropDown(FilterBar);
