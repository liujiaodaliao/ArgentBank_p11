const transactionService = require("../services/transactionService");

// 创建新的交易
module.exports.createTransactions = async (req, res, next) => {
  try {
    const transactionData = req.body; // 从请求体中获取交易数据
    const result = await transactionService.createTransactions(transactionData);
    // 将交易数据传递给服务层函数

    res.status = 200;
    res.message = "account query successfully ";
    res.body = result;
  } catch (error) {
    console.error("Something went wrong in transactionController.js", error);
    res.status = 400;
    res.message = error.message;
  }
};

// 获取指定账户的所有交易记录
module.exports.getTransactions = async (req, res) => {
  let response = {};
  try {
    // 从请求参数中获取账户ID
    const accountId = req.query.id;

    // 调用服务函数获取交易记录
    const transactions = await transactionService.getTransactions(accountId);

    // 返回获取的交易记录
    response.status = 200;
    response.message = "account query successfully ";
    response.body = transactions.map((transaction) => transaction.toObject());
  } catch (error) {
    console.error("Something went wrong in transactionController.js", error);
    response.status = 400;
    response.message = error.message;
  }

  res.status(response.status).json(response);
};

// module.exports.updateTransactions = async (req, res) =>{
//   let response = {};
// try {
// const updateTransactions = req.body;
// const transactionId =req.params.transactionId;

// 调用服务函数更新交易记录
// const updatedTransaction = await transactionService.updateTransactions(transactionId, updateTransactions);

// 返回更新后的交易记录
// response.status = 200;
// response.message = "Transaction updated successfully";
// response.body = updatedTransaction.toObject(); // 转换为普通 JavaScript 对象
// } catch (error) {
//     console.error("Something went wrong in transactionController.js", error);
//     response.status = 400;
//     response.message = error.message;
//   }
//   res.status(response.status).json(response);

// };
