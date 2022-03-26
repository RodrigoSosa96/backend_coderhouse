import { Request } from "express";
import { unlink } from "fs/promises";
import { Strategy, IStrategyOptionsWithRequest } from "passport-local";
import { User, UserModel } from "../../models";
import UserController from "../user/User.controller";

const opts: IStrategyOptionsWithRequest = {
	passReqToCallback: true,
	usernameField: "email",
};

export const LocalSignup = new Strategy(opts, async function (req:Request, email:string, password:string, done: Function) {
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
});

export const LocalLogin = new Strategy(opts, async function (
	req: Request,
	email: string,
	password: string,
	done: Function
) {
	try {
		const user = await UserModel.findOne({ email }).exec();
		if (!user) {
			return done(null, false, { message: "Usuario no existe" });
		}
		if (!(await user.comparePassword(password))) {
			return done(null, false, { message: "Contraseña incorrecta" });
		}
		return done(null, user.toObject());
	} catch {
		done("Error validando los datos");
	}
});