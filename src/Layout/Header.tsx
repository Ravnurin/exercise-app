import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Theme
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Menu as MenuIcon } from '@material-ui/icons';

import { logoutUser } from 'ActionCreators/Authentication';
import { ApplicationState } from 'Reducers';

interface OwnProps {
  logoutUser: (history: History) => void;
}

type Props = OwnProps & RouteComponentProps & ApplicationState;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const getLink = (name: string, props: any) => (
  <Button key={name} component={props.to && Link} color='inherit' {...props}>
    {name}
  </Button>
);

function Header(props: Props) {
  const classes = useStyles();
  const { auth, history, location } = props;
  const { isAuthenticated } = auth;

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.logoutUser(history);
  };

  const getGuestLinks = () => {
    const links = [
      { name: 'Login', props: { to: '/login', component: Link } },
      { name: 'Register', props: { to: '/register', component: Link } }
    ];

    return links.map(l => getLink(l.name, l.props));
  };
  const getAuthLinks = () => {
    const links = [
      { name: 'Home', props: { to: '/' } },
      { name: 'Customise', props: { to: '/customise' } },
      { name: 'Nutrition', props: { to: '/nutrition' } },
      {
        name: 'Logout',
        props: {
          onClick: (e: MouseEvent<HTMLButtonElement>) => handleLogout(e)
        }
      }
    ];

    return links.map(l => getLink(l.name, l.props));
  };

  const pageTitle =
    location.pathname === '/'
      ? 'Home'
      : `${location.pathname[1].toUpperCase()}${location.pathname.slice(2)}`;

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' className={classes.title}>
            {pageTitle}
          </Typography>
          {isAuthenticated ? getAuthLinks() : getGuestLinks()}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = ({ auth }: Partial<ApplicationState>) => ({
  auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header) as any);
