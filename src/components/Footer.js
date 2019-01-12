import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="todo-footer">
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
    );
  }
}

export default withFirebase(Footer);
