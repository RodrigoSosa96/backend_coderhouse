import { unlink } from "fs/promises";
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { UserModel, User } from "../../models";
// import UserController from "../user/User.controller";

import { LocalSignup, LocalLogin } from "./local.passport";

export function passport_load(passport: PassportStatic) {
    passport.use("signup", LocalSignup);
    passport.use("login", LocalLogin);
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