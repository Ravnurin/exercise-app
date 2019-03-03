import { ProgramSchemaLayout } from './Program';

export interface BasicUser {
  username: string;
}

export interface SecureUser extends BasicUser {
  password: string;
}

export interface UserModel extends BasicUser, SecureUser {
  _id: string;
  date: Date;
  exercises: ProgramSchemaLayout;
}
