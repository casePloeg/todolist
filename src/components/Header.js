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
        <button type="submit" onClick={() => console.log('yeet')}>
          hello
        </button>
      </div>
    );
  }
}

export default withFirebase(Footer);
