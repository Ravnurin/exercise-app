import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import classnames from 'classnames';

interface Props {
  labelTitle?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string;
  name: string;
  type?: any;
  errors?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: Props) => {
  const { disabled = false,
    value,
    type = 'text',
    errors = {},
    name,
    placeholder,
    labelTitle,
    onChange
  } = props;
  const errorMessage = errors[name];
  return (
    <FormGroup>
      <Label for={name} className='text-left' style={{ color: 'black' }}>{ labelTitle ? placeholder : ''}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classnames({ 'is-invalid': errorMessage})}
        disabled={disabled} />
      <FormFeedback valid={!errorMessage}>{errorMessage}</FormFeedback>
    </FormGroup>
  );
};

export default FormInput;
