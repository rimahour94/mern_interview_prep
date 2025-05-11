const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
// server.use(cors());
server.use(cors({ origin: true, credentials: true }));

server.post("/create", (req, res) => {
  const { email, password } = req?.body;

  return res.status(200).json({ email, password });
});

server.get("/", (req, res) => {
  res.send("Hello");
});
server.listen(8000, () => {
  console.log(`Server is running on ${8000}`);
});
