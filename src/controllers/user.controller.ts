import { NextFunction, Request, Response } from "express";



declare module 'express-session' {
    export interface SessionData {
        logged: boolean
        contador: number
        user: string
        admin: boolean
    }
}

export const loginGet = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('login')
    }
}
export const loginPost = async (req: Request, res: Response) => {
    res.redirect('/');
    // res.send('login post')
}

export const loginFailed = async (req: Request, res: Response) => {
    // res.render('login', {
    //     message: 'Login failed'
    // })
    res.render('failed', { message: 'Login failed' })
}


//signup
export const signupGet = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.render('signup')
    }
}

export const signupPost = async (req: Request, res: Response) => {
    res.redirect('/')
}

export const signupFailed = async (req: Request, res: Response) => {
    res.json({ message: 'Signup failed' })
}

//*Logout

export const logoutPost = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).json({ message: 'Logout success' })
    } else {
        // res.redirect('/login')
        res.status(401).json({ message: 'Logout failed' })
    }
}