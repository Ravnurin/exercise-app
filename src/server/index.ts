// import * as API from './apiCalls';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';

import users from './routes/User';
import exercises from './routes/Exercise';
import customExercises from './routes/CustomExercise';
import nutrition from './routes/Nutrition';

import DB from './database/db';
import PassportInstance from './passport';

mongoose.connect(DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected'); },
  err => { console.log(`Can not connect to the database: ${err}`); }
);
mongoose.set('useFindAndModify', false);

const app = express();
app.use(passport.initialize());
PassportInstance(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/exercises', passport.authenticate('jwt', { session: false }), exercises);
app.use('/api/customExercises', passport.authenticate('jwt', { session: false }), customExercises);
app.use('/api/nutrition', passport.authenticate('jwt', { session: false }), nutrition);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
