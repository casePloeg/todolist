import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import FilterBar from './FilterBar';
import '../css/Header.css';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { dropClass: '' };
  }

  componentWillMount() {}

  /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
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
      <div>
        <FilterBar
          resetFilter={this.props.resetFilter}
          setFilter={this.props.setFilter}
        />
        <button
          type="submit"
          onClick={() => this.props.toggleCompleted()}
        >
          Toggle Completed
        </button>

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
            <button type="submit" onClick={() => console.log('yeet')}>
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
      </div>
    );
  }
}

export default withFirebase(Footer);
