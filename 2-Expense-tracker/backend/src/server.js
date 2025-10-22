// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionRoute from "./routes/transactionRoute.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(rateLimiter);

app.use("/api/transactions", transactionRoute);

// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is ", req.method);
//   next();
// });

const port = process.env.PORT || 5001;

// our custom simple middleware
app.get("/", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("ip", ip);
  res.send("IP adresin: " + ip);
});



initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is up and running on Port: ${port}`);
  });
});
