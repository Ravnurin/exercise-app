import express from 'express';
import { ErrorState } from 'Types/Errors';

import User from '../models/User';

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

    return res.json(user.customExercises);
  });
});

router.post('/user/update', (req, res) => {
  const { username, customExerciseName } = req.body as { username: string, customExerciseName: string };

  User.findOne({ username }).then((user: any) => {
    const errors = {} as ErrorState;

    if (user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }

    const customExercises = [...user.customExercises] as any;
    console.log("CUSTOM EXERCISE IS ", customExerciseName);

    console.log("CUSTOM EXERCISES SAVED ARE ", customExercises);
    if (customExercises.includes(customExerciseName.toLowerCase())) {
      console.log("CUSTOM EXERCISE EXISTS");
      errors.customExercise = 'Exercise already exists';
      return res.status(HttpStatusCode.ClientError);
    }

    User.findOneAndUpdate({ username }, { $push: { customExercises: customExerciseName.toLowerCase() } }, { new: true }, (e, u: any) => {
      if (e) {
        return res.status(HttpStatusCode.ClientError).json(e);
      }

      if (!u) {
        errors.username = 'Exercises not updated';
        return res.status(HttpStatusCode.ClientError);
      }
      return res.json(u.customExercises);
    });
  });
});

export default router;
