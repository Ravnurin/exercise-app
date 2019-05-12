import React, { ChangeEvent } from 'react';

import { ErrorState } from 'Types/Errors';
import { InputLabel, FormControl, Input, FormHelperText } from '@material-ui/core';

export interface Props {
  autoFocus?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  placeholder?: string;
  value: string | number;
  name: string;
  required?: boolean;
  type?: 'text' | 'number' | 'password';
  fullWidth?: boolean;
  errors?: ErrorState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

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
    required,
    onChange,
    fullWidth = false
  } = props;
  return (
    <FormControl
      margin='normal'
      required={required}
      fullWidth={fullWidth}
      error={errors[name] != null}>
      <InputLabel htmlFor={name}>{placeholder}</InputLabel>
      <Input
        required={required}
        autoFocus={autoFocus}
        aria-describedby={`${name}-error-text`}
        autoComplete={autoComplete || 'off'}
        disabled={disabled}
        id={name}
        name={name}
        onChange={e => onChange(e)}
        type={type}
        value={value}
      />
      <FormHelperText id={`${name}-error-text`}>{errors[name]}</FormHelperText>
    </FormControl>
  );
};
