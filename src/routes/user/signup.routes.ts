import { Router } from "express";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { signupFailed, signupGet, signupPost } from "../../controllers/user.controller";

import User from "../../models/user/User";
// import { createHash } from "../../utils/checkPass";


const signUp = Router();

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const newUser = new User({
            username,
            password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        try {
            await newUser.save();
            return done(null, newUser);
        } catch (err:any) {
            if(err.code === 11000) {
                return done(null, false, { message: "Usuario o email ya existe" });
            }
            console.log(err);
            return done(err);
        }
    }
))

signUp
    .get("/", signupGet)
    .post("/", passport.authenticate("signup", { failureRedirect: "/signup/failed", failureFlash: true  }), signupPost)
    .get("/failed", signupFailed);


export default signUp;