const transactionService = require("../services/transactionService");

// 创建新的交易
exports.createTransactions = async (req, res, next) => {
  try {
    const transactionData = req.body; // 从请求体中获取交易数据
    const result = await transactionService.createTransactions(transactionData);
    // 将交易数据传递给服务层函数

    res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Something went wrong in transactionController.js", error);
    response.status = 400;
    response.message = error.message;
  }
};

// 获取指定账户的所有交易记录
exports.getTransactions = async (req, res, next) => {
  try {
    // 从请求参数中获取账户ID
    const accountId = req.params.accountId;

    // 调用服务函数获取交易记录
    const transactions = await transactionService.getTransactions(accountId);

    // 返回获取的交易记录
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("Something went wrong in transactionController.js", error);
    response.status = 400;
    response.message = error.message;
  }
};
