const Account = require("../database/models/accountModel");
const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccount = (userId) => [
  {
    userId,
    accountTitle: "Argent Bank Checking (x8349)",
    amount: 0,
    amountDescription: "Available Balance",
  },
  {
    userId,
    accountTitle: "Argent Bank Savings (x6712)",
    amount: 0,
    amountDescription: "Available Balance",
  },
  {
    userId,
    accountTitle: "Argent Bank Credit Card (x8349)",
    amount: 0,
    amountDescription: "Current Balance",
  },
];

// module.exports.createAccount = async (serviceData) => {
//   try {
//     const users = await User.find();
//     // console.log("所有用户", users);
//     if (!users.length) return;

//     const total = [];

//     users.map(async (user) => {
//       const accounts = await Account.find({ userId: user.id });
//       console.log(`该用户${user.id}的账户有${accounts.length}个`);
//       if (accounts.length > 2) return;
//       console.log(user.id);
//       const createResult = createAccount(user.id);
//       total.push(...createResult);

//       total.map(async (t) => {
//         const newAccount = new Account(t);
//         const result = await newAccount.save();
//         return result;
//       });
//     });

//     return;
//   } catch (error) {
//     console.error("Error in accountService.js", error);
//     throw new Error(error);
//   }
// };

module.exports.createAccount = async (serviceData) => {
  try {
    const users = await User.find();
    if (!users.length) return;

    for (const user of users) {
      const accounts = await Account.find({ userId: user.id });
      console.log(`该用户${user.id}的账户有${accounts.length}个`);
      if (accounts.length > 2) continue;

      const createResult = createAccount(user.id);
      for (const accountData of createResult) {
        const newAccount = new Account(accountData);
        const result = await newAccount.save();
        console.log("创建账户成功:", result);
      }
    }
  } catch (error) {
    console.error("Error in accountService.js", error);
    throw new Error(error);
  }
};
