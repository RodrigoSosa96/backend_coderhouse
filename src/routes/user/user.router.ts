import { Router } from "express";
import passport from "passport";

import controller from "../../controllers/user.controller";
const User = Router();

User
    .get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }))
    .get("/auth/facebook/redirect", passport.authenticate("facebook", {failureRedirect: "/user/failedLogin"}), (req, res) => {
        res.redirect("/");
    })
    .get("/datos", controller.datos)
    .get("/failedLogin", controller.failedLogin)
    .get("/logout", controller.logout)

export default User;