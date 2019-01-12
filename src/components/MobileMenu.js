import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import SortWithDropDown from './SortWithDropDown.js';
import FilterWithDropDown from './FilterWithDropDown.js';

import '../css/Header.css';
class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { filterShow: '', sortShow: '', statsShow: '' };
  }

  displayFilter() {
    this.setState(() => ({
      filterShow: '',
      sortShow: '',
      statsShow: '',
    }));
    if (!this.state.filterShow) {
      this.setState(
        prevState => (prevState['filterShow'] = 'mobile-show'),
      );
    }
  }

  displaySort() {
    this.setState(() => ({
      filterShow: '',
      sortShow: '',
      statsShow: '',
    }));
    if (!this.state.sortShow) {
      this.setState(
        prevState => (prevState['sortShow'] = 'mobile-show'),
      );
    }
  }

  displayStats() {
    this.setState(() => ({
      filterShow: '',
      sortShow: '',
      statsShow: '',
    }));
    if (!this.state.statsShow) {
      this.setState(
        prevState => (prevState['statsShow'] = 'mobile-show'),
      );
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
            this.displayFilter();
          }}
          onFocus={() => console.log('gained focus')}
        >
          {filter}
        </button>
      ));
    }
    return (
      <div className="todo-menu-wrapper">
        <div className="mobile-menu">
          <button
            className={this.state.filterShow}
            onClick={() => this.displayFilter()}
          >
            Filter
          </button>
          <button
            className={this.state.sortShow}
            onClick={() => this.displaySort()}
          >
            Sort
          </button>
          <button
            className={this.state.statsShow}
            onClick={() => this.displayStats()}
          >
            Stats
          </button>
        </div>
        <div className={'mobile-filter ' + this.state.filterShow}>
          {filterButtons}
          <button
            type="submit"
            onClick={() => {
              this.props.setFilter('');
              this.displayFilter();
            }}
          >
            Clear
          </button>
        </div>
        <div className={'mobile-sort ' + this.state.sortShow}>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('pri');
              this.displaySort();
            }}
          >
            Priority
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('context');
              this.displaySort();
            }}
          >
            Context
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('project');
              this.displaySort();
            }}
          >
            Project
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('');
              this.displaySort();
            }}
          >
            Clear
          </button>
        </div>
        <div className={'mobile-stats ' + this.state.statsShow}>
          <p>
            completed today: <span>{this.props.completedToday}</span>
          </p>
          <p>
            # created today: <span>{this.props.createdToday}</span>{' '}
          </p>
          <p>
            # due today: <span>{this.props.dueToday}</span>
          </p>
          <p>
            # overdue: <span>{this.props.overdue}</span>
          </p>
          <p>
            Filter: <span>{this.props.filter}</span>
          </p>
          <p>
            Sort: <span>{this.props.sort}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default withFirebase(MobileMenu);
