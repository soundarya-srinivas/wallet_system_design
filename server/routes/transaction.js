const express = require("express");
const router = express.Router();
const { transaction, getTransactions } = require("../controller/transaction");


router.route("/transactions").get(getTransactions);
router.route("/transact/:walletid").post(transaction);

module.exports = router;
