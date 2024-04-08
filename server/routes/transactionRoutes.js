const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const tokenValidation = require("../middleware/tokenValidation");

// POST请求用于创建新的交易
router.post(
  "/transaction",
  tokenValidation.validateToken,
  async (req, res, next) => {
    try {
      // 从请求中获取账户 ID
      const accountId = req.body.accountId;
      // 其他交易信息
      const transactionData = {
        date: req.body.date,
        description: req.body.description,
        amount: req.body.amount,
        balance: req.body.balance,
        trasactionType: req.body.transactionType,
        category: req.body.category,
        note: req.body.note,
      };

      // 调用控制器函数并传递账户 ID 和交易数据
      const newTransaction = await transactionController.createTransaction(
        accountId,
        transactionData
      );

      // 返回成功响应
      res.status(201).json({ success: true, transaction: newTransaction });
    } catch (error) {
      // 处理错误情况
      console.error("Error creating transaction:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to create transaction" });
    }
  }
);

// GET请求用于获取特定交易的详细信息
router.get(
  "/transaction/:id",
  tokenValidation.validateToken,
  transactionController.getTransactions
);

// PUT请求用于更新特定交易的信息
// router.put(
//   "/transaction/:id",
//   tokenValidation.validateToken,
//   transactionController.updateTransactions
// );

// DELETE请求用于删除特定交易
// router.delete(
//   "/transaction/:id",
//   tokenValidation.validateToken,
//   transactionController.deleteTransactionsInfo
// );

module.exports = router;
