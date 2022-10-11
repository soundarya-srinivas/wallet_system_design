const express = require("express");
const router = express.Router();
const { wallet, getWallet } = require("../controller/wallet");

router.route("/wallet/:walletid").get(getWallet);
router.route("/setup").post(wallet);

module.exports = router;
