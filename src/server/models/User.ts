import mongoose from 'mongoose';

import ProgramSchema from './Program/Program';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  exercises: {
    type: [ProgramSchema],
    default: [ProgramSchema]
  }
});

const Users = mongoose.model('Users', UserSchema);

export default Users;
