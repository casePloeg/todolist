import React, { Component } from 'react';
import { withDropDown } from './DropDown.js';

class SortBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropdown">
        <button
          type="submit"
          onClick={() => this.props.showDropDown()}
          className="dropbtn"
        >
          New Sort
        </button>
        <div
          id="myDropdown"
          className={'dropdown-content ' + this.props.dropClass}
        >
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('pri');
              this.props.showDropDown();
            }}
          >
            Priority
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('context');
              this.props.showDropDown();
            }}
          >
            Context
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('project');
              this.props.showDropDown();
            }}
          >
            Project
          </button>
          <button
            type="submit"
            onClick={() => {
              this.props.setSort('');
              this.props.showDropDown();
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default withDropDown(SortBar);
