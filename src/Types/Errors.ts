export interface ErrorState {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  customExercise?: string;
}

export interface ErrorAction {
  type: string;
  payload: ErrorState;
}
