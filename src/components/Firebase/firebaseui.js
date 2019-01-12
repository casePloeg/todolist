import * as firebaseui from 'firebaseui';
import { withFirebase } from './Firebase';

import React, { Component } from 'react';

class FirebaseUI extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="todo-add">
        <h2>Add a filter:</h2>
        <input type="text" onKeyPress={event => this.search(event)} />
      </div>
    );
  }
}

export default withFirebase(FirebaseUI);
