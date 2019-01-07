import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import AddFilter from '../AddFilter';

class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = { filters: [] };

    this.handleNewFilter = this.handleNewFilter.bind(this);
  }

  componentDidMount() {
    // acquire filters
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.db
          .ref('/todosConfig/' + user.uid + '/filters')
          .on('value', snap => {
            this.setState(
              prevState => (prevState['filters'] = snap.val()),
            );
          });
      }
    });
  }

  handleNewFilter(newFilter) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.db
          .ref('/todosConfig/' + user.uid + '/filters')
          .limitToLast(1)
          .once('value')
          .then(snap => {
            let newId = 0;
            if (snap.val() !== null) {
              // get the id for the next to be added item
              newId = parseInt(Object.keys(snap.val())[0]) + 1;
            }

            let updates = {};
            updates[
              'todosConfig/' + user.uid + '/filters/' + newId
            ] = newFilter;
            this.props.firebase.db.ref().update(updates);

            console.log(newId);
          });
      }
    });
  }

  render() {
    //hello
    let filters;
    if (this.state.filters) {
      filters = this.state.filters.map(filter => <p>{filter}</p>);
    }

    return (
      <div>
        <h1>Current Filters:</h1>
        {filters}
        <AddFilter handleNewFilter={this.handleNewFilter} />
      </div>
    );
  }
}

export default withFirebase(ConfigPage);
