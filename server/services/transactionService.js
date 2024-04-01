const Transaction = require("../database/models/transactionModel");
const Account = require("../database/models/accountModel");
const jwt = require("jsonwebtoken");

module.exports.createTransactions = async () => {
  try {
    // 查询所有账户
    const accounts = await Account.find();
    if (!accounts.length) return;

    // 遍历每个账户
    for (const account of accounts) {
      // 创建账户的初始交易记录
      const initialTransactions = [
        {
          accountId: account._id,
          date: new Date(),
          description: "Golden Sun Bakery",
          amount: 10,
          balance: account.amount,
          transactionType: "Deposit",
          category: "Initial",
          note: "Initial deposit",
        },
        // 可以根据需要添加更多的初始交易记录
      ];

      // 遍历账户的初始交易记录并逐个保存到数据库
      for (const transactionData of initialTransactions) {
        const newTransaction = new Transaction(transactionData);
        const result = await newTransaction.save();
        console.log("New transaction created:", result);
      }
    }
  } catch (error) {
    console.error("Error in createTransactions:", error);
    throw new Error(error);
  }
};

module.exports.getTransactions = async (req) => {
  try {
    // 从请求头中获取 token
    const token = req.headers.authorization.split(" ")[1];

    // 验证 token 的有效性
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 获取解码后的用户ID和账户ID
    const userId = decodedToken.userId;
    const accountId = req.body.accountId;

    // 根据用户ID和账户ID查询指定账户的交易记录
    const transactions = await Transaction.find({
      userId: userId,
      accountId: accountId,
    });

    return transactions;
  } catch (error) {
    console.error("Error in getTransactions:", error);
    throw new Error(error);
  }
};
