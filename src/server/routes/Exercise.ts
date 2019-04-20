import express from 'express';
import { ErrorState } from 'Types/Errors';

import User from '../models/User';
import moment from 'moment';

enum HttpStatusCode {
  ClientError = 400
}

const router = express.Router();

router.get('/user', (req, res) => {
  User.findOne({ username: req.user.username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (!user) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }
    return res.json(user.exercises);
  });
});

router.post('/user/update', (req, res) => {
  const { exercises: workout } = req.body;
  const { username } = req.user;

  User.findOne({ username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }
    const { exercises } = user;
    const exercise = exercises[exercises.length - 1] || {};

    if (exercise.date && moment(exercise.date).startOf('day').isSame(moment(workout.date).startOf('day'))) {
      exercises[exercises.length - 1] = workout;
    } else {
      exercises.push(workout);
    }
    user.exercises = exercises;
    user
      .save()
      .then((u: any) => {
        res.json(u);
      })
    /* User.findOneAndUpdate({ username }, updateQuery, { new: true }, (e, u: any) => {
      if (e) {
        return res.status(HttpStatusCode.ClientError).json(e);
      }

      if (!u) {
        errors.username = 'Exercises not updated';
        return res.status(HttpStatusCode.ClientError);
      }
      return res.json(u.exercises);
    }); */
  });
});

export default router;
