import { NextFunction, Request, Response } from "express";


export const logoutPost = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).json({ message: 'Logout success' })
    } else {
        // res.redirect('/login')
        res.status(401).json({ message: 'No estaba logueado' })
    }
}