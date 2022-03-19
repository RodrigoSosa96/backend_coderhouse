import { unlink } from "fs/promises";
import mongoose from "mongoose";
import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { UserModel, User } from "../../models";
import Logger from "../../utils/logger";

export function passport_load(passport: PassportStatic) {
    passport.use("signup", new Strategy({ passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const body = req.body as User
                const newUser = await UserModel.create({
                    email,
                    password,
                    name: body.name,
                    address: body.address,
                    age: body.age,
                    phoneNumber: body.phoneNumber,
                    picture: req.file?.filename,
                    role: body.role
                })
                const pojo = newUser.toObject()
                console.log(pojo)
                return done(null, pojo);
            } catch ({code}) {
                if(req.file) {
                    console.log("Borrando archivo")
                    await unlink(req.file.path)
                }
                if (code === 11000) {
                    return done(null, false, { message: "Usuario ya existe" });
                }
                return done(null, false, { message: "Error validando los datos" });
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
            catch  {
                done("Error validando los datos");
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

