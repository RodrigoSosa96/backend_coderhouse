import { Request, Response } from "express";


export const loginGet = async (req: Request, res: Response) => {

    if (req.isAuthenticated()) res.redirect('/')
    else res.render('login', { jsfile: 'form-data.js' })
}
export const loginPost = async (req: Request, res: Response) => {
    // res.send('login post')
    res.status(200).json({ message: 'Login success' })
    // res.redirect('/');
}

export const loginFailed = (req: Request, res: Response) => {
    res.status(401).json({ message: req.flash('error')[0] })
    // res.render('failed', { message: req.flash('error')[0] ?? "Error" })
}

export const datos = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        res.status(200).json({ message: req.user })
    } else {
        res.status(401).json({ message: 'No estas autenticado' })
    }
}