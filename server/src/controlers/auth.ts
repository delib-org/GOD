const passport = require('passport');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = require('passport-google-oauth2').Strategy;

function passportCallback(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/google/callback',
    passReqToCallback: true,
  },
  passportCallback,
));

function serializeCallback(user, done) {
  done(null, user);
}

passport.serializeUser(serializeCallback);

passport.deserializeUser(serializeCallback);
