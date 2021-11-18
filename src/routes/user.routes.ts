import { Router } from "express";
import {login, logout} from "../controllers/user.controller"; 
const user = Router();

user
    .get("/login", login)
    .get("/logout", logout)


export default user;