import { Strategy, StrategyOptions } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import { UserModel, User } from '../../models';

const opts: StrategyOptions = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter("secret_token"), ExtractJwt.fromHeader("secret_token"), ExtractJwt.fromAuthHeaderAsBearerToken()]),
};

const JWTStrategy = new Strategy(opts, async (token, done) => {
    try {
        const user = await UserModel.findById(token.id).lean().exec();
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err, false);
    }
});


const JWTLogin = new Strategy(opts, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(e)
    }
})
export default JWTStrategy;