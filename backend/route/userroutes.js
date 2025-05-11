import express from "express";
import { registerUser, userlogin } from "../controllers/users.controller.js";
const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", userlogin);

export { userRoute };
