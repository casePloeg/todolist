import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class SignOutButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push(ROUTES.SIGN_IN);
    this.props.firebase.doSignOut();
  }

  render() {
    return (
      <a
        className="nav-link"
        onClick={() => {
          this.onClick();
        }}
      >
        Sign Out
      </a>
    );
  }
}

export default withRouter(withFirebase(SignOutButton));
