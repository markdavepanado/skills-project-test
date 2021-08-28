import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/user", userRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
