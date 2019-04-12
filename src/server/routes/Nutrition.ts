import express from 'express';
import { ErrorState } from 'Types/Errors';

import Nutrition from '../models/Nutrition';

enum HttpStatusCode {
  ClientError = 400
}

const router = express.Router();

router.post('/user/foodItems', (req, res) => {
  Nutrition.findOne({ username: req.body.username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (!user) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }

    return res.json(user.nutrition);
  });
});

export default router;
