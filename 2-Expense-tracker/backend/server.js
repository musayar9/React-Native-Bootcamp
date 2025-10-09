// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   console.log("Hey we hit a req, the method is ", req.method);
//   next();
// });

const port = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id  VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
  )`;

    // DECIMAL(10,2)
    // MEANS: a fixed-point number with:
    // 10 digits total
    // 2 digits adter the decimal point
    // so: the max value it can store is 9999999.99 (8 digits before the decimal , 2 after)

    console.log("Databas initialized successfully");
  } catch (error) {
    console.log("Error initializing  DB", error);
    process.exit(1); // status code 1 means failure, 0 success
  }
}

// our custom simple middleware
app.get("/", (req, res) => {
  res.send("It's working here ");
});

app.get("/api/transactions", async (req, res) => {
  try {
    let transaction = await sql`SELECT * FROM transactions`;
    console.log(transaction);
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.log(error);
  }
});

// userıd for data

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    console.log(req.params, "params value");
    const { userId } = req.params;

    let transaction =
      await sql`SELECT * FROM transactions  WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return res.status(200).json(transaction);
  } catch (error) {
    console.log("Error creating transaction", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/transactions", async (req, res, next) => {
  console.log("re", req.body);
  try {
    const { title, user_id, amount, category } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction =
      await sql`INSERT INTO  transactions(user_id, title, amount, category) 
    VALUES (${user_id}, ${title}, ${amount}, ${category})  RETURNING *`;

    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transaction", error);

    res.status(500).json({ message: "Internal Server Error" });
    // next(error);
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res
      .status(200)
      .json({ message: " Transaction Deleted  successfully" });
  } catch (error) {
    console.log("Error deleting transaction", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}`;

    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`;

    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`;

    return res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error getting summary", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
});

initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is up and running on Port: ${port}`);
  });
});
