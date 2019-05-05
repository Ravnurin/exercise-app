import React from 'react';
import TextField from '@material-ui/core/TextField';

import { Props } from './Input';

export default (props: Props) => {
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
    required
  } = props;

  return (
    <TextField
      margin='dense'
      autoFocus={autoFocus}
      fullWidth
      required={required}
      error={errors[name] != null}
      id={name}
      name={name}
      label={placeholder}
      onChange={onChange}
      value={value}
      type={type}
      disabled={disabled}
      autoComplete={autoComplete || 'off'}
    />
  );
};
