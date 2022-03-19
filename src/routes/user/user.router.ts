import { Router } from "express";
import passport from "passport";

import { loginGet, loginPost, loginFailed, logout, signupFailed, signupGet, signupPost, datos } from "../../controllers/user";
import upload from "../../middlewares/multer.middleware";
import auth from "../../middlewares/auth.middleware";
import { changeDataGet, changePasswordPost, changeUserDataPost, userInfo } from "../../controllers/user/updateUser.controller";

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
    //Actualizar datos:
    .get("/user-info", auth, userInfo)
    .get("/change-data", auth, changeDataGet)
    .post("/change-data", auth, upload.single("picture"), changeUserDataPost)
    .post("/change-password", auth, changePasswordPost)

    //Logout:
    .get("/logout", logout)

export default user;