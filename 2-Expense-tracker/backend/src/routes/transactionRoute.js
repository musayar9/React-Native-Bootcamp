import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  transactionSummary,
  trnsactionDetail,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router
  .get("/", getTransactions)
  .post("/", createTransaction)
  .get("/:userId", trnsactionDetail)
  .delete("/:id", deleteTransaction)
  .get("/summary/:userId", transactionSummary);

export default router;
