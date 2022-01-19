import mongoose from "mongoose";
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../models/schemas";

export function passport_load(passport: PassportStatic) {
    passport.use("signup", new Strategy({ passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const user = await UserModel.findOne({ email }).exec();
                if (user) {
                    return done(null, false, { message: "Usuario ya existe" });
                }
                const newUser = new UserModel({
                    email,
                    password,
                    name: req.body.name,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    age: req.body.age,
                    phoneNumber: req.body.phoneNumber,
                    picture: req.body.picture,
                });
                await newUser.save();
                return done(null, newUser);
            } catch (err) {
                if (err instanceof mongoose.Error.ValidationError) {
                    return done(null, false, { message: "Error validando los datos" });
                }
                return done(err);
            }
        }
    ));


    passport.use("login", new Strategy({ passReqToCallback: true, usernameField: "email" },
        async (req, email: string, password: string, done) => {
            try {
                console.log("login");
                const user = await UserModel.findOne({ email }).exec();
                if (!user) {
                    return done(null, false, { message: "Usuario no existe" });
                }
                if (await user.comparePassword(password)) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }
                console.log(user);
                return done(null, user);
            }
            catch (err) {
                done(err);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        console.log("serializeUser: ", user);
        done(null, user._id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            console.log("deserializeUser: ", id);
            const user = await UserModel.findById(id);
            done(null, user);
        }
        catch (err) {
            done(null, false);
        }
    });
}

