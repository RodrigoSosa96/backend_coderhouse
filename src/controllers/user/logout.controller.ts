import { NextFunction, Request, Response } from "express";


export const logout = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/');
    } else {
        // res.redirect('/login')
        res.status(401).json({ message: 'No estaba logueado' })
    }
}