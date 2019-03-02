export interface ErrorState {
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export interface ErrorAction {
  type: string;
  payload: ErrorState;
}
