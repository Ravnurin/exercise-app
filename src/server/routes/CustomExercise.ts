import express from 'express';

import { ErrorState } from 'Types/Errors';

import User from '../models/User';

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

    return res.json(user.customExercises);
  });
});

router.post('/user/add', (req, res) => {
  const { username } = req.user;
  User.findOne({ username }).then((user: any) => {
    const errors: ErrorState = {};

    if (user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }

    const { customExercises } = user;
    const customExerciseName = req.body.customExerciseName.toLowerCase();

    if (customExercises.includes(customExerciseName)) {
      errors.customExerciseName = 'Exercise already exists';
      return res.status(HttpStatusCode.ClientError).json(errors);
    }

    user.customExercises.push(customExerciseName);
    user
      .save()
      .then((u: any) => {
        res.json(u.customExercises);
      })
  });
});

router.post('/user/delete', (req, res) => {
  const { customExerciseName } = req.body;
  const { username } = req.user;

  User.findOne({ username }).then((user: any) => {
    const errors = {} as ErrorState;

    if (user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }
    console.log(customExerciseName);
    console.log(user.customExercises);
    user.customExercises = user.customExercises.filter((c: string) => c !== customExerciseName);
    user
      .save()
      .then((u: any) => {
        res.json(u.customExercises);
      })
  });
});

export default router;
