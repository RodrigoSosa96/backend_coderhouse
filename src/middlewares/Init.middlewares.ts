import { json, urlencoded } from "express";
import compression from "compression";
import passport from "passport";
import cookieParser from "cookie-parser";
import morganMiddleware from "./morgan.middleware";
import flash from "connect-flash";
import sessionMiddleware from "./session.middleware";


export const middlewares = [
    compression(),
    json(),
    urlencoded({ extended: true }),
    cookieParser(),
    sessionMiddleware,
    passport.initialize(),
    passport.session(),
    morganMiddleware,
    flash(),
]