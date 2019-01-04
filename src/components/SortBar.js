import React, { Component } from 'react';
import '../css/SortBar.css';

class SortBar extends Component {
  constructor(props) {
    super(props);
    this.state = { dropClass: '' };
  }

  showDropDown() {
    console.log("yo what's good");
    if (this.state.dropClass) {
      this.setState(prevState => (prevState['dropClass'] = ''));
    } else {
      this.setState(
        prevState => (prevState['dropClass'] = 'showDrop'),
      );
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button
          type="submit"
          onClick={() => this.showDropDown()}
          className="dropbtn"
        >
          Sort
        </button>
        <div
          id="myDropdown"
          className={'dropdown-content ' + this.state.dropClass}
        >
          <button
            type="submit"
            onClick={() => this.props.setSort('pri')}
          >
            Priority
          </button>
          <button type="submit" onClick={() => console.log('yeet')}>
            Context
          </button>
          <button type="submit" onClick={() => console.log('yeet')}>
            Project
          </button>
        </div>
      </div>
    );
  }
}

export default SortBar;
