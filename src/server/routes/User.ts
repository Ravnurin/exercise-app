import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import validateLoginInput from '../validation/user';
import validateRegisterInput from '../validation/registration';
import User from '../models/User';
import { secret } from '../passport';

enum HttpStatusCode {
  ClientError = 400
}

const router = express.Router();

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(HttpStatusCode.ClientError).json(errors);
  }
  const { username, password } = req.body;

  User.findOne({ username }).then(user => {
    if (user) {
      return res.status(HttpStatusCode.ClientError).json({
        username: 'Username already exists'
      });
    } else {
      const newUser: any = new User({
        username,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error('There was an error', err);
        } else {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (err) {
              console.error('There was an error', error);
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then((u: any) => {
                  res.json(u);
                });
            }
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(HttpStatusCode.ClientError).json(errors);
  }

  const { username, password } = req.body;

  User.findOne({ username }).then((user: any) => {
    if (!user || user == null) {
      errors.username = 'User not found';
      return res.status(HttpStatusCode.ClientError).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username }

        jwt.sign(payload, secret, {
          expiresIn: 360000
        }, (err, token) => {
          if (err) {
            console.error(`There is some error in token: ${token}`);
          } else {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        });
      } else {
        errors.password = 'Incorrect password';
        return res.status(HttpStatusCode.ClientError).json(errors);
      }
    });
  });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    username: req.user.username
  });
});

export default router;
