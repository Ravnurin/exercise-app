import Validator from 'validator';
import isEmpty from '../../Utils/isEmpty';

interface ValidationData {
  username: string;
  password: string;
}

const validateLoginInput = ({ username, password }: ValidationData) => {
  const errors = {} as ValidationData;

  username = !isEmpty(username) ? username : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(username)) {
    errors.username = 'Username is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
