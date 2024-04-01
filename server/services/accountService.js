const Account = require("../database/models/accountModel");
const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccount = (userId) => [
  {
    userId,
    accountTitle: "Argent Bank Checking (x8349)",
    amount: 0,
    description: "Available Balance",
  },
  {
    userId,
    accountTitle: "Argent Bank Savings (x6712)",
    amount: 0,
    description: "Available Balance",
  },
  {
    userId,
    accountTitle: "Argent Bank Credit Card (x8349)",
    amount: 0,
    description: "Current Balance",
  },
];

module.exports.createAccount = async (serviceData) => {
  try {
    const users = await User.find();
    if (!users.length) return;

    for (const user of users) {
      const accounts = await Account.find({ userId: user.id });
      console.log(`该用户${user.id}的账户有${accounts.length}个`);
      if (accounts.length > 2) continue; // 使用break来跳出内部循环

      const createResult = createAccount(user.id);
      for (const accountData of createResult) {
        const newAccount = new Account(accountData);
        const result = await newAccount.save();
        console.log("new account successully:", result);
      }
    }
  } catch (error) {
    console.error("Error in accountService.js", error);
    throw new Error(error);
  }
};

module.exports.getAccount = async (serviceData) => {
  const jwtToken = serviceData.headers.authorization.split("Bearer")[1].trim();
  const decodedJwtToken = jwt.decode(jwtToken);

  const accounts = await Account.find({ userId: decodedJwtToken.id });

  return accounts;
};
// module.exports.updateAccount
