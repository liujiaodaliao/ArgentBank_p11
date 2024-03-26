const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: String,
    accountTitle: String,
    amount: Number,
    description: String,
    createAt: String,
    updateAt: String,
  },

  {
    timestamps: true,
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
