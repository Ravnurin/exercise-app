import express from 'express';
import { ErrorState } from 'Types/Errors';

import User from '../models/User';
import moment from 'moment';

enum HttpStatusCode {
  ClientError = 400
}

const router = express.Router();

router.post('/user', (req, res) => {
  User.findOne({ username: req.body.username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (!user) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }
    return res.json(user.exercises);
  });
});

router.post('/user/update', (req, res) => {
  const { username, exercises: workout } = req.body;

  User.findOne({ username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }
    const { exercises } = user;
    const exercise = exercises[exercises.length - 1] || {};

    let updateQuery;
    if (exercise.date && moment(exercise.date).startOf('day').isSame(moment(workout.date).startOf('day'))) {
      const updatedExercises = [...exercises];
      updatedExercises[exercises.length - 1] = workout;

      updateQuery = { $set: { exercises: updatedExercises } };
    } else {
      updateQuery = { $push: { exercises: workout } };
    }

    User.findOneAndUpdate({ username }, updateQuery, { new: true }, (e, u: any) => {
      if (e) {
        return res.status(HttpStatusCode.ClientError).json(e);
      }

      if (!u) {
        errors.username = 'Exercises not updated';
        return res.status(HttpStatusCode.ClientError);
      }
      return res.json(u.exercises);
    });
  });
});

export default router;
