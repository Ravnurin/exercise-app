import { upperBody } from '../server/models/Program/UpperBody';
import { lowerBody } from '../server/models/Program/LowerBody';

export interface BasicUser {
  username: string;
}

export interface SecureUser extends BasicUser {
  password: string;
}

export interface UserModel extends BasicUser, SecureUser {
  _id: string;
  date: Date;
  exercises: Exercises;
}

export interface Exercises {
  date: Date;
  upperBody: typeof upperBody;
  lowerBody: typeof lowerBody;
}
