import { Router } from "express";
import passport from "passport";
import multer from "multer";

import { loginGet, loginPost, loginFailed, logoutPost, signupFailed, signupGet, signupPost } from "../../controllers/user";
import { postPicture } from "../../controllers/user/upload";

const upload = multer({ dest: "uploads/" });
const user = Router();
user
    //Signup:
    .get("/signup", signupGet)
    .post("/signup", passport.authenticate("signup", { failureRedirect: "/signup/failed", failureFlash: true }), signupPost)
    .get("/signup/failed", signupFailed)
    //Login:
    .get("/login", loginGet)
    .post("/login",(req, res, next) => {
        console.log(req)
        next()
    }, passport.authenticate("login", { failureRedirect: "/login/failed", failureFlash: true }), loginPost)
    .get("/login/failed", loginFailed)
    // .get("/datos", datos)//? Datos user
    //Logout:
    .get("/logout", logoutPost)
    .post("/profile/upload", upload.single("avatar"), postPicture )

export default user;