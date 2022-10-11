const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    walletId: {
      type: ObjectId,
      ref: "wallet",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", transactionSchema);
