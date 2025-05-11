import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create", (req, res) => {
  const { email, password } = req.body;
  return res.status(200).send({ email, password });
});

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.listen(8000, () => {
  console.log(`server is running on port ${8000}`);
});
