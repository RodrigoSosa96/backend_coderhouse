import { Request, Response } from "express";
import Logger from "../../utils/logger";


export const signupGet = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('signup')
    }
}

export const signupPost = async (req: Request, res: Response) => {
    // res.redirect('/')
    res.status(200).json({ message: 'Signup success' })
}

export const signupFailed = async (req: Request, res: Response) => {
    res.status(401).json({ message: req.flash('error')[0] })
    // res.render('failed', { message: req.flash('error')[0] || "Error" })
}

