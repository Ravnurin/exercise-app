import React, { ChangeEvent } from 'react';
import { useFormState, InputElement } from 'react-use-form-state';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';
import classnames from 'classnames';

import { ErrorState } from 'Types/Errors';

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

export default (props: Props) => {
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
      <Label for={name} className='text-left' style={{ color: 'black' }}>{labelTitle ? placeholder : ''}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classnames({ 'is-invalid': errorMessage })}
        disabled={disabled} />
      <FormFeedback valid={!errorMessage}>{errorMessage}</FormFeedback>
    </FormGroup>
  );
};

interface FormProps {
  autoComplete?: string;
  errors?: ErrorState;
  inputType?: InputType;
  labelTitle: string;
  name: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<InputElement>) => void;
}

export const FormStateInput = (props: FormProps) => {
  const { autoComplete = 'off', labelTitle, name, inputType = 'text', placeholder = '', errors = {}, onChange } = props;
  const [, { label, text }] = useFormState<{ [key: string]: string }>(
    { [name]: '' },
    { withIds: true }
  );

  const isValid = errors![name] == null;
  return (
    <FormGroup>
      <Label {...label(name)}>{labelTitle}</Label>
      <Input
        {...text({
          name,
          onChange,
          validate: () => isValid
        })}
        type={inputType}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={classnames({ 'is-invalid': !isValid })} />
      <FormFeedback valid={isValid}>{errors![name]}</FormFeedback>
    </FormGroup>
  )
};
