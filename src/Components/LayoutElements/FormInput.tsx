import React, { ChangeEvent } from 'react';

import { ErrorState } from 'Types/Errors';
import {
  InputLabel,
  FormControl,
  Input,
  FormHelperText
} from '@material-ui/core';

interface Props {
  autoFocus?: boolean;
  autoComplete?: string;
  labelTitle?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string;
  name: string;
  type?: 'text' | 'number' | 'password';
  errors: ErrorState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default (props: Props) => {
  const {
    autoFocus,
    autoComplete,
    disabled,
    value,
    type,
    errors,
    name,
    placeholder,
    onChange
  } = props;
  return (
    <FormControl
      margin='normal'
      required
      fullWidth
      error={errors[name] != null}>
      <InputLabel htmlFor={name}>{placeholder}</InputLabel>
      <Input
        autoFocus={autoFocus}
        aria-describedby={`${name}-error-text`}
        autoComplete={autoComplete || 'off'}
        disabled={disabled}
        id={name}
        name={name}
        type={type}
        onChange={e => onChange(e)}
        value={value}
      />
      <FormHelperText id={`${name}-error-text`}>{errors[name]}</FormHelperText>
    </FormControl>
  );
};
