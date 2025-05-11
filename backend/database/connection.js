import mongoose from "mongoose";

export const connection = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Databse connected!!"))
    .catch((err) => console.log(err.message));
};
 