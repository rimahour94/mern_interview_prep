import express from "express";
import { registerUser, userlogin } from "../controllers/users.controller.js";
import { upload } from "../utils/upload.js";
const userRoute = express.Router();

userRoute.post("/register", upload.single("avatar"), registerUser);
userRoute.post("/login", userlogin);

export { userRoute };
