import React, { MouseEvent, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { History } from 'history';

import { logoutUser } from 'ActionCreators/Authentication';
import './Header.scss';
import { ApplicationState } from 'Reducers';


const getUrl = (url: string) => `/${url}`;
const getNavLink = (children: JSX.Element | any[] | string, { route = '', ...props }) =>
  <NavLink to={getUrl(route)} className='nav-link' activeClassName='active' {...props}>{children}</NavLink>;

interface OwnProps {
  logoutUser: (history: History) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;

function Header(props: Props) {
  const { isAuthenticated } = props.auth;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    props.logoutUser(props.history);
  }

  const getAuthLinks = () => {
    const links = [
      { name: 'Logout', route: '#', onClick: (e: any) => handleLogout(e) },
      { name: 'Customise', route: 'customise', props: {} },
      { name: 'Nutrition', route: 'nutrition', props: {} }
    ];
    return links.map((l, index: number) => <NavItem key={`${index}-${l.name}`}>{getNavLink(l.name, { route: l.route, key: `${l.name}-${index}`, ...l })}</NavItem>);
  }

  const getGuestLinks = () => {
    const links = [
      { name: 'Register', route: 'register' },
      { name: 'Login', route: 'login' }
    ];
    return links.map((l, index: number) => <NavItem key={`${index}-${l.name}`}>{getNavLink(l.name, { route: l.route, key: `${l.name}-${index}` })}</NavItem>);
  };

  const guestLinks = getGuestLinks();
  const authLinks = getAuthLinks();
  return (
    <header className='header'>
      <div>
        <Navbar color='dark' dark expand='md' fixed='top' id='mainNav'>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mx-auto' navbar>
              <NavItem>
                {getNavLink('Home', {})}
              </NavItem>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
}

const mapStateToProps = ({ auth }: Partial<ApplicationState>) => ({
  auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Header as any));
