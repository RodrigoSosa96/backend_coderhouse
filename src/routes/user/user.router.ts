import { Router } from "express";
import passport from "passport";

import { loginGet, loginPost, loginFailed, logoutPost, signupFailed, signupGet, signupPost, datos } from "../../controllers/user";
import upload from "../../middlewares/multer.middleware";

const user = Router();
user
    //Signup:
    .get("/signup", signupGet)
    .post("/signup", upload.single("picture"), passport.authenticate("signup", { failureRedirect: "/failed", failureFlash: true }), signupPost)
    .get("/failed", signupFailed)
    //Login:
    .get("/login", loginGet)
    .post("/login", passport.authenticate("login", { failureRedirect: "/login/failed", failureFlash: true }), loginPost)
    .get("/login/failed", loginFailed)
    .get("/datos", datos)
    //Logout:
    .get("/logout", logoutPost)

export default user;