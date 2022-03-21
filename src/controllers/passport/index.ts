import { unlink } from "fs/promises";
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { UserModel, User } from "../../models";
import UserController from "../user/User.controller";

export function passport_load(passport: PassportStatic) {
    passport.use("signup", new Strategy({ passReqToCallback: true, usernameField: "email" }, UserController.createLocal));
    passport.use("login", new Strategy({ passReqToCallback: true, usernameField: "email" }, UserController.loginLocal));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await UserModel.findById(id).lean().exec();
            done(null, user);
        }
        catch {
            done(null, false);
        }
    });
}