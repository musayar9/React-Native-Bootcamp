import { sql } from "../config/db.js";

const getTransactions = async (req, res) => {
  try {
    let transaction = await sql`SELECT * FROM transactions`;
    console.log(transaction);
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.log(error);
  }
};

const trnsactionDetail = async (req, res) => {
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
};

const createTransaction = async (req, res) => {
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
};

const deleteTransaction = async (req, res) => {
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
};

const transactionSummary = async (req, res) => {
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
};
export {
  getTransactions,
  trnsactionDetail,
  createTransaction,
  deleteTransaction,
  transactionSummary,
};
