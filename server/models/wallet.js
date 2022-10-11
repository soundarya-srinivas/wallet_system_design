const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const walletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    date:{
        type:Date,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wallet", walletSchema);
