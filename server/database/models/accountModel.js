const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: String,
    accountTitle: String,
    amount: Number,
    description: String,
  },

  {
    timestamps: true,
    // toObject 是需要调用的  调用的时候需要注意 数据库返回的是对象还是数组
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.updateAt;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Account", accountSchema);
