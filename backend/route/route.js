import express from "express";
import { userRoute } from "./userroutes.js";

const route = express();
route.use("/api/user", userRoute);

export { route };
