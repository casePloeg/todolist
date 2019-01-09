import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false, menuBtnClass: '', menuClass: '' };
  }

  toggleMenu() {
    if (!this.state.showMenu) {
      this.setState(() => {
        return {
          menuBtnClass: 'close',
          menuClass: 'show',
          showMenu: true,
        };
      });
    } else {
      this.setState(() => {
        return { menuBtnClass: '', menuClass: '', showMenu: false };
      });
    }
  }
  render() {
    return (
      <div>
        <div
          class={'menu-btn ' + this.state.menuBtnClass}
          onClick={() => this.toggleMenu()}
        >
          <div class="btn-line" />
          <div class="btn-line" />
          <div class="btn-line" />
        </div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth
                authUser={authUser}
                menuClass={this.state.menuClass}
              />
            ) : (
              <NavigationNonAuth menuClass={this.state.menuClass} />
            )
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const NavigationAuth = ({ authUser, menuClass }) => (
  <nav className={'menu ' + menuClass}>
    <ul>
      <li className={'nav-item ' + menuClass}>
        <Link className="nav-link" to={ROUTES.LANDING}>
          Landing
        </Link>
      </li>
      <li className={'nav-item ' + menuClass}>
        <Link className="nav-link" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li className={'nav-item ' + menuClass}>
        <Link className="nav-link" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      <li className={'nav-item ' + menuClass}>
        <Link className="nav-link" to={ROUTES.TODO}>
          Todo List
        </Link>
      </li>
      <li className={'nav-item ' + menuClass}>
        <Link className="nav-link" to={ROUTES.CONFIG}>
          Config
        </Link>
      </li>
      {authUser.roles.includes(ROLES.ADMIN) && (
        <li className={'nav-item ' + menuClass}>
          <Link className="nav-link" to={ROUTES.ADMIN}>
            Admin
          </Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </nav>
);

const NavigationNonAuth = ({ menuClass }) => (
  <nav className={'menu ' + menuClass}>
    <ul>
      <li className={'nav-item '}>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li className={'nav-item '}>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
