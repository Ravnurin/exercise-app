import mongoose from 'mongoose';
import { upperBody } from './UpperBody';
import { lowerBody } from './LowerBody';
import { ProgramSchemaLayout } from 'Types/Program';

type DbSchema = ProgramSchemaLayout & mongoose.Document;

const Schema = mongoose.Schema;
const ProgramSchema = new Schema<DbSchema>({
  date: {
    type: Date,
    default: Date.now
  },
  upperBody: upperBody,
  lowerBody: lowerBody
});

export default ProgramSchema;
