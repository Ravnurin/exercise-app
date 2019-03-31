import mongoose from 'mongoose';

import { upperBody } from './UpperBody';
import { lowerBody } from './LowerBody';
import { ProgramSchemaLayout } from 'Types/Program';
import moment from 'moment';

type DbSchema = ProgramSchemaLayout & mongoose.Document;

const Schema = mongoose.Schema;
const ProgramSchema = new Schema<DbSchema>({
  upperBody,
  lowerBody,
  date: {
    type: Date,
    default: moment().startOf('day')
  }
});

export default ProgramSchema;
