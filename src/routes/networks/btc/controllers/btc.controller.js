const web3 = require("../../../../networks/btc/index");


const createAccount = async (req, res) => {
  try {
      const created = await web3.createAccount();
      return res.status(200).json({
        status: "success", 
        message: "Account created successfully",
        data: created
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  createAccount,
};
