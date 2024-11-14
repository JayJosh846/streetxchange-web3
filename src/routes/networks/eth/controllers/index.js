const router = require("express").Router();

const {
  createAccount,
  checkBalance
} = require("./eth.controller");

router.post("/create-account/", createAccount);
router.get("/account-balance/:address", checkBalance);




module.exports = router;
