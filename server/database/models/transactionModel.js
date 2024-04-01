const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
{
    accountId: String,
    date: Date,
    description: String,
    amount: Number,
    balance: Number,
    transactionType: String,
    category: String,
    note: String,
}, 

{
    timestamps: true, // 添加此选项以在文档中自动包含 createdAt 和 updatedAt 字段
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
}
);

module.exports = mongoose.model("Transaction", transactionSchema);