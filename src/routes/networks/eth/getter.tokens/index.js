const router = require("express").Router();

const {
  allowance,
  balanceOf,
  decimals,
  getBlackListStatus,
} = require("./getter.token.controller");

router.get("/allowance/:network", allowance);
router.get("/balance", balanceOf);
router.get("/decimals/:network", decimals);
router.get("/get-black-list-status/:network", getBlackListStatus);

module.exports = router;
