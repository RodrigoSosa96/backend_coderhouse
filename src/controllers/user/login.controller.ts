import { Request, Response } from "express";


export const loginGet = async (req: Request, res: Response) => {

    if (req.isAuthenticated()) res.redirect('/')
    else res.render('login')
}
export const loginPost = async (req: Request, res: Response) => {
    // res.redirect('/');
    // res.send('login post')
    console.log('login post')
    res.status(200).json({ message: 'Login success' })
}

export const loginFailed = (req: Request, res: Response) => {
    // res.status(401).json({ message: 'Login failed' })
    console.log("Login failed: ", req.flash('error')[0])
    res.render('failed', { message: req.flash('error')[0] || "Error" })
}
