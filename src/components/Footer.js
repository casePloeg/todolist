import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div>
        <p># completed today: {this.props.completedToday}</p>
        <p># created today: {this.props.createdToday} </p>
        <p># due today: {this.props.dueToday}</p>
        <p># overdue: {this.props.overdue}</p>
      </div>
    );
  }
}

export default withFirebase(Footer);
