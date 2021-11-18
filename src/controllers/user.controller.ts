import { NextFunction, Request, Response } from "express";


/**
 * ! Crear clase Login
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.email === "alex" && req.query.password === "password") {
            req.session.logged = true;
            res.redirect("/");
        } else {
            res.send("Login incorrecto");
        }
    } catch {
        next()
    }
}
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            res.redirect("/");
        });
    } catch {

    }
}