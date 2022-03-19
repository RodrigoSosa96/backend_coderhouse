import session from "express-session";
import MongoStore from "connect-mongo";
import { serverConfig } from "../configs";


const sessionMiddleware = session({
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
})

export default sessionMiddleware;