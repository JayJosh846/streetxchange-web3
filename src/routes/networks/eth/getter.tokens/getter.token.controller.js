const web3 = require("../../../../networks/erc20/index");

const allowance = async (req, res) => {
  const { owner, spender } = req.body;
  const { network } = req.params;
  try {
    const allowanced = await web3.allowance(owner, spender, network);
    return res.status(200).json({ status: "success", data: allowanced });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const balanceOf = async (req, res) => {
  const { bantuPublicKey } = req.query;
  try {
    const balance = await web3.balanceOf(bantuPublicKey);
    return res.status(200).json({
      status: "success",
      message: "Balance gotten successfully",
      data: balance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const decimals = async (req, res) => {
  const { network } = req.params;
  try {
    const decimals = await web3.decimals(network);
    return res.status(200).json({ status: "success", data: decimals });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const getBlackListStatus = async (req, res) => {
  const { maker } = req.body;
  const { network } = req.params;
  try {
    const getBlackListStatus = await web3.getBlackListStatus(maker, network);
    return res
      .status(200)
      .json({ status: "success", data: getBlackListStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  allowance,
  balanceOf,
  decimals,
  getBlackListStatus,
};
