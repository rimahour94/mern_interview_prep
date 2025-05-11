import express from "express";
import { config } from "dotenv";
import { route } from "./route/route.js";
import { connection } from "./database/connection.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// .env configure
config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
// eslint-disable-next-line no-undef
const URL = process.env.USER_DATABASE_URL;
// eslint-disable-next-line no-undef
const secretKey = process.env.SECRET_KEY;
app.use(route);
connection(URL);

// jwt
export const generateJwtToken = (payload) => {
  console.log(secretKey);

  return jwt.sign(payload, secretKey, { expiresIn: "15m" });
};

app.get("/", (_, res) => res.send("<h2>Server is running</h2>"));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${PORT}`);
});
