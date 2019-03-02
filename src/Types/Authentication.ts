import { Actions } from 'constants/Authentication';
import { BasicUser } from './User';

export interface AuthState {
  isAuthenticated: boolean;
  user: BasicUser;
}

export interface AuthAction {
  type: Actions;
  payload: BasicUser;
}
