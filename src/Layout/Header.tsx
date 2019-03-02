import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem
} from 'reactstrap';

import { logoutUser } from 'ActionCreators/Authentication';
// import logo from 'resources/logo.png';
import './Header.scss';

const getUrl = (url: string) => `/${url}`;
const getNavLink = (children: JSX.Element | any[] | string, url: string = '', props: any = {}) =>
  <NavLink to={getUrl(url)} className='nav-link' activeClassName='active' {...props}>{children}</NavLink>;

interface State {
  isOpen: boolean;
  auth: any;
}

interface Props {
  auth: any;
  history: string[];
  logoutUser: (history: string[]) => void;
}

class Header extends Component<Props, State> {
  readonly state: State = {
    isOpen: false,
    auth: {}
  };

  handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  getAuthLinks = () => {
    const { avatar, name } = this.props.auth.user;
    return (
      <NavItem>
        <NavLink to='#' className='nav-link' onClick={this.handleLogout}>
          <img src={avatar} alt={name} title={name} className='rounded-circle' style={{ width: '25px', marginRight: '5px'}} />
          Logout
        </NavLink>
      </NavItem>
    );
  }

  getGuestLinks() {
    const links = [
      { name: 'Register', route: 'register' },
      { name: 'Login', route: 'login'}
    ];
    return links.map((l, index: number) => <NavItem key={`${index}-${l.name}`}>{getNavLink(l.name, l.route, { key: `${l.name}-${index}`})}</NavItem>);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = this.getGuestLinks();
    const authLinks = this.getAuthLinks();
    return (
      <header className='header'>
        <div>
          <Navbar color='dark' dark expand='md' fixed='top' id='mainNav'>
            {/* {getNavLink(
              <img src={logo} alt='EasyCal' className='navbar-brand' />
            )} */}
            <NavbarToggler onClick={this.handleToggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mx-auto' navbar>
                <NavItem>
                  {getNavLink('Home')}
                </NavItem>
                { isAuthenticated ? authLinks : guestLinks }
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ auth }: State) => ({
  auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header as any));
