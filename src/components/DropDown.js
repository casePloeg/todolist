import React, { Component } from 'react';

export function withDropDown(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = { dropClass: '' };

      this.showDropDown = this.showDropDown.bind(this);
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

    render() {
      return (
        <WrappedComponent
          showDropDown={this.showDropDown}
          dropClass={this.state.dropClass}
          {...this.props}
        />
      );
    }
  };
}
