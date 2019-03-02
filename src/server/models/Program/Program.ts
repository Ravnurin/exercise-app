import mongoose from 'mongoose';
import { upperBody } from './UpperBody';
import { lowerBody } from './LowerBody';

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  upperBody: upperBody,
  lowerBody: lowerBody
});

export default ProgramSchema;
