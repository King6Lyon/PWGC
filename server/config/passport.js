// /config/passport.js
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as MicrosoftStrategy } from 'passport-microsoft'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

// ----- Stratégie JWT (déjà en place) -----
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id)
      if (user) return done(null, user)
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  })
)

// ----- Stratégie Google OAuth -----
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName,
            role: 'user',
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

// ----- Stratégie Microsoft OAuth -----
passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: '/api/auth/microsoft/callback',
      scope: ['user.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ microsoftId: profile.id })
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            microsoftId: profile.id,
            name: profile.displayName,
            role: 'user',
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

// ----- Stratégie LinkedIn OAuth -----
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: '/api/auth/linkedin/callback',
      scope: ['r_liteprofile', 'r_emailaddress'],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ linkedinId: profile.id })
        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            linkedinId: profile.id,
            name: profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`,
            role: 'user',
          })
        }
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

export default passport
