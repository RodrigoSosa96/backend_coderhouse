import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../../models";

export const changeDataGet = async (req: Request, res: Response) => {
    res.render("change-data" , { jsfile: "form-data.js" });
}

export const changePasswordPost = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        if(!req.user) return res.redirect("/login");
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const checkPassword = await bcrypt.compare(oldPassword, req.user.password);
        if(!checkPassword) return res.status(400).send("La contraseña actual no es correcta");
        const user = await UserModel.findById(req.user._id).orFail().exec()
        user.password = newPassword;
        await user.save();
        res.status(200).json("Contraseña cambiada correctamente");
    } catch {
        res.status(400).json("Error al cambiar la contraseña");
    }
}
export const changeUserDataPost = async (req: Request, res: Response) => {
    console.log(req.file)
    console.log(req.files)
    console.log(req.body)
    try {
        // if(!req.user) return res.redirect("/login");
        // const user = await UserModel.findById(req.user._id).orFail().exec()
        // user.name = req.body.name;
        // // user.email = req.body.email;
        // user.address = req.body.address;
        // user.age = req.body.age;
        // user.phoneNumber = req.body.phoneNumber;
        // await user.save();
        res.json({message:"Datos cambiados correctamente", ok: true});

    } catch(err) {
        res.status(400).json({message:"Error al cambiar los datos", ok: false});
    }
}

export const userInfo = async (req: Request, res: Response) => {
    if(!req.user) return res.redirect("/login");
    res.render("user-info", { user: req.user });
}