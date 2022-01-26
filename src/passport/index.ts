import mongoose from "mongoose";
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { IUser, UserModel } from "../models/_index";
import Logger from "../utils/logger";

export function passport_load(passport: PassportStatic) {
    passport.use("signup", new Strategy({ passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const body = req.body as IUser
                const newUser = await UserModel.create<IUser>({
                    email,
                    password,
                    name: body.name,
                    address: body.address,
                    age: body.age,
                    phoneNumber: body.phoneNumber,
                    picture: req.file?.filename,
                });
                return done(null, newUser.toObject());
            } catch (err) {
                // @ts-ignore
                if (err.code === 11000) {
                    return done(null, false, { message: "Usuario ya existe" });
                }
                if (err instanceof mongoose.Error) {
                    return done(null, false, { message: "Error validando los datos" });
                }
                return done(err);


            }
        }
    ));


    passport.use("login", new Strategy({ passReqToCallback: true, usernameField: "email" },
        async (_req, email: string, password: string, done) => {
            try {
                const user = await UserModel.findOne({ email }).exec();
                if (!user) {
                    return done(null, false, { message: "Usuario no existe" });
                }
                if (!await user.comparePassword(password)) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }
                return done(null, user.toObject());
            }
            catch (err) {
                done(err);
            }
        }
    ));


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

