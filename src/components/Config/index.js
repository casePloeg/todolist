import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class ConfigPage extends Component {
  render() {
    return <p>Configure how your todolist is displayed here </p>;
  }
}

export default withFirebase(ConfigPage);
