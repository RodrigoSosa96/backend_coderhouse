import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) return next() //req.session?.admin
	// else return res.render("index", { producto: {}, existe: false });
	return res.render("unauthorized")
}
export default auth;