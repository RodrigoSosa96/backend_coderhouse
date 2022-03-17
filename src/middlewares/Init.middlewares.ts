import { json, urlencoded } from "express";
import compression from "compression";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import morganMiddleware from "./morgan.middleware";
import flash from "connect-flash";
import { serverConfig } from "../configs";



export const middlewares = [
    compression(),
    json(),
    urlencoded({ extended: true }),
    cookieParser(),
    session({
        store: new MongoStore({
            mongoUrl: serverConfig.mongoDB.url,
            collectionName: "sessions"
        }),
        secret: process.env.SECRET_KEY!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000 // 10 minutos
        }
    }),
    passport.initialize(),
    passport.session(),
    morganMiddleware,
    flash(),
]