import { Router } from "express";

import { logoutPost } from "../../controllers/user.controller";

const logout = Router();

logout.post("/", logoutPost);

export default logout;