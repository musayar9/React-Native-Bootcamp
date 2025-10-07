// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It's working here ");
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
