import Validator from 'validator';
import isEmpty from '../../Utils/isEmpty';

interface ValidationData {
  username: string;
  password: string;
  passwordConfirm: string;
  currentPassword?: string;
  newPassword?: string;
}

export const validateUserInput = (user: Partial<ValidationData>) => {
  const errors = {} as ValidationData;
  const { username, currentPassword, newPassword } = user;

  if (username != null && !Validator.isLength(username, { min: 2, max: 30})) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  if (username != null && Validator.isEmpty(username)) {
    errors.username = 'Username field is required';
  }

  if (currentPassword != null && !Validator.isLength(currentPassword, {min: 6, max: 30})) {
      errors.currentPassword = 'Current Password must have 6 chars';
  }

  if (currentPassword != null && Validator.isEmpty(currentPassword)) {
      errors.currentPassword = 'Current Password is required';
  }

  if (currentPassword != null && !Validator.isEmpty(currentPassword) && newPassword == null || (newPassword != null && Validator.isEmpty(newPassword))) {
      errors.newPassword = 'New Password is required';
  }

  if (newPassword != null && !Validator.isLength(newPassword, {min: 6, max: 30})) {
      errors.newPassword = 'New Password must have 6 chars';
  }

  if (newPassword != null && Validator.isEmpty(newPassword)) {
    errors.newPassword = 'New Password must have 6 chars';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateRegisterInput = ({ username, password, passwordConfirm }: ValidationData) => {
  const errors = {} as ValidationData;
  username = !isEmpty(username) ? username : '';
  password = !isEmpty(password) ? password : '';
  passwordConfirm = !isEmpty(passwordConfirm) ? passwordConfirm : '';

  if (!Validator.isLength(username, { min: 2, max: 30})) {
    errors.username = 'Username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(username)) {
    errors.username = 'Username field is required';
  }

  if (!Validator.isLength(password, {min: 6, max: 30})) {
      errors.password = 'Password must have 6 chars';
  }

  if (Validator.isEmpty(password)) {
      errors.password = 'Password is required';
  }

  if (!Validator.isLength(passwordConfirm, {min: 6, max: 30})) {
      errors.passwordConfirm = 'Password must have 6 chars';
  }

  if (!Validator.equals(password, passwordConfirm)) {
      errors.passwordConfirm = 'Password and Confirm Password must match';
  }

  if (Validator.isEmpty(passwordConfirm)) {
      errors.passwordConfirm = 'Confirm Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRegisterInput;
