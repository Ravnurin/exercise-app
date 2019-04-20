export interface ErrorState {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  customExerciseName?: string;
  [key: string]: string | undefined;
}

export interface ErrorAction {
  type: string;
  payload: ErrorState;
}
