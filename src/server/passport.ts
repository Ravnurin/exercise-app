import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStatic } from 'passport';
import mongoose from 'mongoose';

const Users = mongoose.model('Users');

export const secret = 's15idEi36ZYkvlTZmTGbtjoHQV03HtWh';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

export default function (passport: PassportStatic) {
  passport.use(new Strategy(opts, (jwt_payload, done) => {
    Users.findById(jwt_payload.id)
      .then((user: any) => {
        if (user) {
          return done(null, { username: user.username });
        }
        return done(null, false);
      })
      .catch(err => console.error(err));
  }));
}
