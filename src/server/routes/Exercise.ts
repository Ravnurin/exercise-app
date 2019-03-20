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
    return res.json(user.exercises);
  });
});

router.post('/user/update', (req, res) => {
  const { username, exercises } = req.body;

  User.findOneAndUpdate({ username }, { $set: { exercises } }, { new: true }, (e, user: any) => {
    if (e) {
      return res.status(HttpStatusCode.ClientError).json(e);
    }
    const errors = {} as ErrorState;

    if (!user) {
      errors.username = 'Exercises not updated';
      return res.status(HttpStatusCode.ClientError);
    }
    return res.json(user.exercises);
  }
  );
});

export default router;
