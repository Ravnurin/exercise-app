import React, { ChangeEvent } from 'react';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

import useStyles from 'material/styles';

interface Option {
  value: string;
  innerText?: string;
}

export interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string | number;
  name: string;
  required?: boolean;
  options: Option[];
  useInputLabel?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default (props: Props) => {
  const { formControl } = useStyles();
  const {
    autoFocus,
    options,
    disabled,
    value,
    name,
    placeholder,
    useInputLabel = true,
    required,
    onChange
  } = props;

  const inputLabel = useInputLabel && <InputLabel htmlFor={name}>{placeholder}</InputLabel>;

  return (
    <FormControl className={formControl}>
      {inputLabel}
      <Select
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        inputProps={{ name: name, id: `${name}-select` }}
        required={required}
        disabled={disabled}>
        {options.map(o => (
          <MenuItem value={o.value}>{o.innerText || o.value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
