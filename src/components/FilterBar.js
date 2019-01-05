import React, { Component } from 'react';

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropClass: '' };
  }

  showDropDown() {
    if (this.state.dropClass) {
      this.setState(prevState => (prevState['dropClass'] = ''));
    } else {
      this.setState(
        prevState => (prevState['dropClass'] = 'showDrop'),
      );
    }
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
          onClick={() => this.props.setFilter(filter)}
        >
          {filter}
        </button>
      ));
    }

    return (
      <div className="todo-filter">
        <input type="text" onKeyPress={event => this.search(event)} />
        <button
          type="submit"
          onClick={() => this.props.resetFilter()}
        >
          Clear Filter
        </button>

        <div className="dropdown">
          <button
            type="submit"
            onClick={() => this.showDropDown()}
            className="dropbtn"
          >
            Filter
          </button>
          <div
            id="myDropdown"
            className={'dropdown-content ' + this.state.dropClass}
          >
            {filterButtons}
          </div>
        </div>
      </div>
    );
  }
}

export default FilterBar;
