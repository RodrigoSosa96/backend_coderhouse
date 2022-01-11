import { NextFunction, Request, Response } from "express";
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook'

import config from '../configs/server.config';
import User from "../models/user/user.model";

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'email', 'name', 'picture.type(large)']
},
    async function (_accessToken, _refreshToken, profile, done) {
        try {
            console.log(profile);
            const user = await User.findOne({ facebookId: profile.id }).exec();
            
            if (user) return done(null, user);
            const newUser = new User({
                facebookId: profile.id,
                email: profile._json.email,
                picture: profile._json.picture.data.url,
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
            });
            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            done(err);
        }
    }
));


const failedLogin = async (_req: Request, res: Response) => {
    res.render("failed", { message: "Login failed" });
}
const datos = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) res.json(req.user);
    else res.redirect("/");
}
const logout = async (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
}

export default { failedLogin, datos, logout };
