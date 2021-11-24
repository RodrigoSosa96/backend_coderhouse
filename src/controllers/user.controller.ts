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
	res.status(200).send('login post')
	// res.send('login post')
}
export const loginFailed = async (req: Request, res: Response) => {

	// res.render('failed', { message: req.flash("error")[0] })
	res.status(401).send({ message: req.flash("error")[0] })
}


//signup
export const signupGet = async (req: Request, res: Response) => {
	if (req.isAuthenticated()) {
		res.redirect('/')
	} else {
		res.render('signup')
	}
}

export const signupPost = async (_req: Request, res: Response) => {
	res.status(201).send('Usuario creado')
}

export const signupFailed = async (req: Request, res: Response) => {
	const flash = await req.flash("error")
	res.status(409).send({ message: flash[0] })
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