import express from 'express';
import { ErrorState } from 'Types/Errors';

import User from '../models/User';

enum HttpStatusCode {
  ClientError = 400
}

const router = express.Router();

router.post('/user/foodItems', (req, res) => {
  User.findOne({ username: req.body.username }).then((user: any) => {
    const errors = {} as ErrorState;
    if (!user) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError);
    }

    return res.json(user.foodItems);
  });
});

router.post('/user/foodItems/add', (req, res) => {
  const { username, foodItem } = req.body;
  console.log("Name is: ", foodItem.name);
  User.findOneAndUpdate({ username }, { $push: { foodItems: foodItem } }, { new: true }, (e, u: any) => {
    const errors = {} as any;
    if (e) {
      return res.status(HttpStatusCode.ClientError).json(e);
    }

    if (!u) {
      errors.nutrition = 'Nutrition food items not updated';
      return res.status(HttpStatusCode.ClientError);
    }
    return res.json(u.foodItems);
  });
})

export default router;
