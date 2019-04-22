import React/* , { MouseEvent, useState } */ from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
/* import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap'; */
import { History } from 'history';
import { AppBar, Toolbar, Typography, Button, IconButton, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import { logoutUser } from 'ActionCreators/Authentication';
import './Header.scss';
import { ApplicationState } from 'Reducers';


/* const getUrl = (url: string) => `/${url}`;
const getNavLink = (children: JSX.Element | any[] | string, { route = '', ...props }) =>
  <NavLink to={getUrl(route)} className='nav-link' activeClassName='active' {...props}>{children}</NavLink>; */

interface OwnProps extends WithStyles<typeof styles> {
  logoutUser: (history: History) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function Header(props: Props) {
  const { classes } = props;
  const { isAuthenticated } = props.auth;
  /* const [isOpen, setIsOpen] = useState(false); */

  /* const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    props.logoutUser(props.history);
  } */

  /* const getAuthLinks = () => {
    const links = [
      { name: 'Customise', route: 'customise', props: {} },
      { name: 'Nutrition', route: 'nutrition', props: {} },
      { name: 'Logout', route: '#', onClick: (e: any) => handleLogout(e) }
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
  const authLinks = getAuthLinks(); */

  const getGuestLinks = () => {
    const links = [
      { name: 'Register', route: 'register' },
      { name: 'Login', route: 'login' }
    ];

    return links.map(l => (
      <Button key={`${l.name}-${l.route}`} color='inherit'>
        <NavLink to={`/${l.route}`} style={{ color: 'inherit', textDecoration: 'none'}}>{l.name}</NavLink>
      </Button>
    ));
  };

  const getAuthLinks = () => {
    const links = [
      { name: 'Customise', route: 'customise', props: {} },
      { name: 'Nutrition', route: 'nutrition', props: {} }/* ,
      { name: 'Logout', route: '#', onClick: (e: any) => handleLogout(e) } */
    ];

    return links.map(l => (
      <Typography variant='h6' color='inherit' className={classes.grow}>
        <NavLink to={`/${l.route}`} {...l.props}>{l.name}</NavLink>
      </Typography>
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>

          { isAuthenticated ? getAuthLinks() : getGuestLinks() }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ auth }: Partial<ApplicationState>) => ({
  auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(withStyles(styles)(Header) as any));

/* <header className='header'>
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
    </header> */