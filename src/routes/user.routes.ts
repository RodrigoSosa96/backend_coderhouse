import { Router } from "express";
import {login, logout, main} from "../controllers/user.controller"; 
const user = Router();

user
    .get("/", main) 
    .post("/login", login)
    .post("/logout", logout)


export default user;