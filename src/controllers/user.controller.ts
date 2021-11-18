import { NextFunction, Request, Response } from "express";

declare module 'express-session' {
    export interface SessionData {
        logged: boolean
        contador: number
        user: string
        admin: boolean
    }
}
/**
 * ! Crear clase Login
 */


export const main = async (req: Request, res: Response) => {
    if (req.session.logged && req.session.contador) {
        req.session.contador += 1
        res.render('login'
            // {
            //     logged: true,
            //     user: req.session.user,
            //     contador: req.session.contador
            // }
        )
    } else {
        res.render('login', {
            logged: false
        })
    };
};

export const login = (req: Request, res: Response) => {
    if (req.session.logged || req.body.username === "alex" && req.body.password === "20605") {
        req.session.logged = true;
        req.session.user = req.body.username;
        req.session.contador = 1;
        res.json({
            ok: true,
            message: "Login correcto"
        });
    } else {
        res.json({
            ok: false,
            message: "Login incorrecto"
        });
    }
};

export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
        if (!err) res.json({ message: "logout success", ok: true });
        else res.json({ message: "logout error", ok: false });
    })
};
