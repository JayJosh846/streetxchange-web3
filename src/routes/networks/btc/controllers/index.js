const router = require("express").Router();

const {
  createAccount,
} = require("./btc.controller");

router.post("/create-account/", createAccount);



module.exports = router;
