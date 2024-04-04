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
      ];

      // 遍历账户的初始交易记录并逐个保存到数据库
      for (const transactionData of initialTransactions) {
        const newTransaction = new Transaction(transactionData);
        const result = await newTransaction.save();
        // console.log("New transaction created:", result);
      }
    }
  } catch (error) {
    console.error("Error in createTransactions:", error);
    throw new Error(error);
  }
};

module.exports.getTransactions = async (accountId) => {
  try {
    // 根据用户ID和账户ID查询指定账户的交易记录
    const transactions = await Transaction.find({
      accountId: accountId,
    });

    return transactions;
  } catch (error) {
    console.error("Error in getTransactions:", error);
    throw new Error(error);
  }
};

// module.exports.updateTransactions = async (
//   transactionId,
//   updateTransactions
// ) => {
//   try {
//     // 根据交易ID查询修改账户的交易备注信息
//     const transaction = await Transaction.findById(transactionId);
//     if (!transaction) {
//       throw new Error("Transaction not found");
//     }
//     transaction.category = updateTransactions.category;
//     transaction.note = updateTransactions.note;

//     const updateTransaction = await transaction.save();
//     // console.log("Transaction updated:", result);
// 
//     return updateTransaction;
//   } catch (error) {
//     console.error("Error in updateTransactions:", error);
//     throw new Error(error);
//   }
// };
