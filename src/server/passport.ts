import { ExtractJwt, Strategy } from 'passport-jwt';
import mongoose from 'mongoose';
import { PassportStatic } from 'passport';

const Users = mongoose.model('Users');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 's15idEi36ZYkvlTZmTGbtjoHQV03HtWh'
};

export default function(passport: PassportStatic) {
  passport.use(new Strategy(opts, (jwt_payload, done) => {
    Users.findById(jwt_payload.id)
      .then(user => {
          if (user) {
              return done(null, user);
          }
          return done(null, false);
      })
      .catch(err => console.error(err));
  }));
}
