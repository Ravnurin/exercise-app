import React from 'react';
import {
  Theme,
  createStyles,
  TextField as MaterialTextField,
  WithStyles,
  withStyles
} from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

interface Props extends WithStyles<typeof styles> {
  label: string;
  id: string;
  extraProps: any;
  inputType?: string;
  autoComplete?: string;
}

function TextField(props: Props) {
  const {
    label,
    id,
    inputType = 'text',
    autoComplete = 'off',
    classes,
    extraProps,
  } = props;

  return (
    <MaterialTextField
      label={label}
      id={id}
      className={classNames(classes.margin, classes.textField)}
      type={inputType}
      autoComplete={autoComplete}
      {...extraProps}
    />
  );
}

export default withStyles(styles)(TextField);