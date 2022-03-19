import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next() //req.session?.admin
	// else return res.render("index", { producto: {}, existe: false });
	return res.redirect("/")
}
export const authCarrito = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next()
	if (req.isUnauthenticated() || !req.user) return res.json({ message: "No estas autenticado" });
}


export default auth;