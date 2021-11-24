import { Router } from "express";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { signupFailed, signupGet, signupPost } from "../../controllers/user.controller";

import User from "../../models/user/User";
import { createHash } from "../../utils/checkPass";


const signUp = Router();

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (user){
                console.log("Usuario ya existe");
                return done(null, false, { message: "User already exists" });
            } 
            const newUser = new User({
                username,
                password: createHash(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            });
            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }
))

signUp
    .get("/", signupGet)
    .post("/", passport.authenticate("signup", { failureRedirect: "/signup/failed" }), signupPost)
    .get("/failed", signupFailed);


export default signUp;