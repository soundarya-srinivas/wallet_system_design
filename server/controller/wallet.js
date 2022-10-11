const mongoose = require("mongoose");
const Wallet = mongoose.model("wallet");

exports.wallet = (req, res, next) => {
  let { name, balance } = req.body;
  

  try {
    if (balance % 1 != 0) balance = balance.toFixed(4);
    const currentDate = new Date(Date.now()).toISOString();
    const wallet = new Wallet({
      name: name,
      balance: balance,
      date: currentDate,
    });

    wallet.save().then((result) => res.json(result));
  } catch (error) {
    console.log("error at transaction", error);
  }
};

exports.getWallet = (req, res, next) => {
  const { walletid } = req.params;

  try {
    Wallet.findById({ _id: walletid }, function (err, result) {
      if (err) {
        console.log("acc not found error", err);
      }
      res.json(result);
    });
  } catch (error) {
    console.log("error at wallet", error);
  }
};
