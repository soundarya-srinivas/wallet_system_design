const mongoose = require("mongoose");
const Transaction = mongoose.model("transaction");
const Wallet = mongoose.model("wallet");

exports.transaction = (req, res, next) => {
  let { amount, type, description } = req.body;
  let { walletid } = req.params;

  let balance;
  try {
    Wallet.findById({ _id: walletid }).then((result) => {
      if (result.length !== 0) {
        balance = result.balance + amount;
        if (balance % 1 != 0) balance = balance.toFixed(4);

        if (amount % 1 != 0) amount = amount.toFixed(4);
        if (Math.sign(balance) !== -1) {
          const transaction = new Transaction({
            amount: amount,
            balance: balance,
            transactionType: type,
            description: description,
            walletId: walletid,
          });

          transaction.save().then((resultData) => {
            Wallet.findByIdAndUpdate(
              { _id: walletid },
              { $set: { balance: balance } },
              { new: true }
            ).then((data) => console.log("data of wallet", data));
            res.json(resultData);
          });
        } else {
          res.json("Cancelled");
        }
      }
    });
  } catch (error) {
    console.log("error at transaction", error);
  }
};

exports.getTransactions = (req, res, next) => {
  const { limit, skip, walletId } = req.query;

  try {
    Transaction.find({ walletId: walletId })
      .select(["-walletId", "-__v", "-updatedAt"])
      .skip(skip)
      .limit(limit)
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    console.log("error at transaction", error);
  }
};
