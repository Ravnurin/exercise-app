import React from 'react';
import { IconButton, Theme, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: '1 1 100%'
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: '0 0 auto'
    }
  })
);

interface Props {
  numSelected: number;
  onDelete: () => void;
}

export default function EnhancedTableToolbar(props: Props) {
  const classes = useStyles();
  const { numSelected, onDelete } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color='inherit' variant='subtitle1'>
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant='h6' id='tableTitle'>
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title='Delete'>
            <IconButton aria-label='Delete' onClick={() => onDelete()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title='Filter list'>
            <IconButton aria-label='Filter list'>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
}
