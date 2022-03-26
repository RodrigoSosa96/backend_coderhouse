import { NextFunction, Request, Response } from "express";
import { unlink } from "fs/promises";
import { User, UserModel } from "../../models";
import {IVerifyOptions, VerifyFunctionWithRequest} from "passport-local";

class UserController {

    static async get (req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserModel.find().orFail().exec();
            return res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }
    // static async createLocal (req:Request, email:string, password:string, done: Function) {
    //     try {
    //         const body = req.body as User
    //         const newUser = await UserModel.create({
    //             email,
    //             password,
    //             name: body.name,
    //             address: body.address,
    //             age: body.age,
    //             phoneNumber: body.phoneNumber,
    //             picture: req.file?.filename,
    //             role: body.role
    //         })
    //         const pojo = newUser.toObject()
    //         console.log(pojo)
    //         return done(null, pojo);
    //     } catch ({code}) {
    //         if(req.file) {
    //             console.log("Borrando archivo")
    //             await unlink(req.file.path)
    //         }
    //         if (code === 11000) {
    //             return done(null, false, { message: "Usuario ya existe" });
    //         }
    //         return done(null, false, { message: "Error validando los datos" });
    //     }
    // }

    // static async loginLocal (_req:Request, email:string, password:string, done:Function) {
    //         try {
    //             const user = await UserModel.findOne({ email }).exec();
    //             if (!user) {
    //                 return done(null, false, { message: "Usuario no existe" });
    //             }
    //             if (!await user.comparePassword(password)) {
    //                 return done(null, false, { message: "Contraseña incorrecta" });
    //             }
    //             return done(null, user.toObject());
    //         }
    //         catch  {
    //             done("Error validando los datos");
    //         }
        
    // }
}

export default UserController;