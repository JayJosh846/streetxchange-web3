const web3 = require("../../../../networks/eth/index");


const createAccount = async (req, res) => {
  try {
      const created = await web3.createAccount();
      return res.status(200).json({
        status: "success", 
        message: "Account created successfully",
        data:{
          publicKey: created.address,
          privateKey: created.privateKey
        }
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const checkBalance = async (req, res) => {
  const { address } = req.params;
  try {
      const created = await web3.checkBalance(address);
      return res.status(200).json({
        status: "success", 
        message: "Account balance retrieved successfully",
        data: created
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const mint = async (req, res) => {
  const { amount, publicKey } = req.body;
  try {
    const minted = await web3.minting(amount, publicKey);
    return res.status(200).json({
      status: "success",
      message: "Account minted successfully",
      data: minted
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const addBlackList = async (req, res) => {
  const { evilUser } = req.body;
  const { network } = req.params;
  try {
    const blackListed = await web3.addBlackList(evilUser, network);
    return res.status(200).json({ status: "success", data: blackListed });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const approve = async (req, res) => {
  const { spender, amount } = req.body;
  const { network } = req.params;
  try {
    const approved = await web3.approve(spender, amount, network);
    return res.status(200).json({ status: "success", data: approved });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const burn = async (req, res) => {
  const { email, amount } = req.body;
  try {
    const burnt = await web3.burn(email, amount);
    return res.status(200).json({
      status: "success",
      message: "Amount burnt successfully",
      data: burnt
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const deposit = async (req, res) => {
  const { email, amount } = req.body;
  const { network } = req.params;
  try {
    const deposited = await web3.deposit(email, amount, network);
    return res.status(200).json({
      status: "success",
      message: "Amount deposited successfully",
      data: deposited
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const decreaseAllowance = async (req, res) => {
  const { spender, subtractedValue } = req.body;
  const { network } = req.params;
  try {
    const decreasedAllowance = await web3.decreaseAllowance(spender, subtractedValue, network);
    return res.status(200).json({ status: "success", data: decreasedAllowance });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const destroyBlackFunds = async (req, res) => {
  const { blackListeduser } = req.body;
  const { network } = req.params;
  try {
    const destroyedBlack = await web3.destroyBlackFunds(blackListeduser, network);
    return res.status(200).json({ status: "success", data: destroyedBlack });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const increaseAllowance = async (req, res) => {
  const { spender, addedValue } = req.body;
  const { network } = req.params;
  try {
    const increasedAllowance = await web3.increaseAllowance(spender, addedValue, network);
    return res.status(200).json({ status: "success", data: increasedAllowance });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const pause = async (req, res) => {
  const { network } = req.params;
  try {
    const paused = await web3.pause(network);
    return res.status(200).json({ status: "success", data: paused });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const removeBlackList = async (req, res) => {
  const { clearedUser } = req.body;
  const { network } = req.params;
  try {
    const removedBlack = await web3.removeBlackList(clearedUser, network);
    return res.status(200).json({ status: "success", data: removedBlack });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const renounceOwnership = async (req, res) => {
  const { network } = req.params;
  try {
    const renouncedOwnership = await web3.renounceOwnership(network);
    return res.status(200).json({ status: "success", data: renouncedOwnership });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const transfer = async (req, res) => {
  const { publicKey, to, amount } = req.body;
  const { network } = req.params;
  try {
    const transferred = await web3.transfer(publicKey, to, amount, network);
    return res.status(200).json({
      status: "success",
      message: "Amount transferred successfully",
      data: transferred
    });
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const transferFrom = async (req, res) => {
  const { from, to, amount } = req.body;
  const { network } = req.params;
  try {
    const transferredFrom = await web3.transferFrom(from, to, amount, network);
    return res.status(200).json({ status: "success", data: transferredFrom });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const transferOwnership = async (req, res) => {
  const { newOwner } = req.body;
  const { network } = req.params;
  try {
    const transferredOwnership = await web3.transferOwnership(newOwner, network);
    return res.status(200).json({ status: "success", data: transferredOwnership });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};










module.exports = {
  createAccount,
  checkBalance,
  mint,
  addBlackList,
  approve,
  burn,
  deposit,
  decreaseAllowance,
  destroyBlackFunds,
  increaseAllowance,
  pause,
  removeBlackList,
  renounceOwnership,
  transfer,
  transferFrom,
  transferOwnership
};
