import { Router } from "express";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { loginFailed, loginGet, loginPost } from "../../controllers/user.controller";
import User from "../../models/user/User";
// import { checkPass } from "../../utils/checkPass";

const login = Router();



passport.use("login", new LocalStrategy({
	passReqToCallback: true
},
	async (_req, username: string, password: string, done) => {
		try {
			const user = await User.findOne({ username }).exec();
			if (!user) return done(null, false, { message: "Usuario no existe" });
			const valid = await user.comparePassword(password);
			if (!valid) return done(null, false, { message: "Contraseña incorrecta" });
			console.log(user);
			return done(null, user);
		}
		catch (err) {
			done(err);
		}
	}
));


login
	.get("/", loginGet)
	.post("/", passport.authenticate("login", { failureRedirect: "/login/failed" , failureFlash:true}), loginPost)
	.get("/failed", loginFailed);

export default login;
