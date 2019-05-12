import React from 'react';
import TextField from '@material-ui/core/TextField';

import { Props } from './Input';
import useStyles from 'material/styles';

export default (props: Props) => {
  const { textField } = useStyles();
  const {
    autoFocus,
    autoComplete,
    disabled,
    value,
    type,
    errors = {},
    name,
    placeholder,
    onChange,
    required,
    fullWidth
  } = props;

  return (
    <TextField
      autoComplete={autoComplete || 'off'}
      autoFocus={autoFocus}
      className={textField}
      disabled={disabled}
      error={errors[name] != null}
      fullWidth={fullWidth}
      id={name}
      label={placeholder}
      margin='normal'
      name={name}
      onChange={onChange}
      required={required}
      type={type}
      value={value}
    />
  );
};
