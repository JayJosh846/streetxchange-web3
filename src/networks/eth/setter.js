const { Config } = require("../../utils");
const TronWeb = require('tronweb')
const { ethers } = require("ethers");


const sha256 = require("simple-sha256")
const crypto = require("crypto")
const { setBantuKeypair,
  setTRC20Keypair,
  setERC20Keypair,
  setUserWallet
} = require("../../utils/keyPair")
const {bscTestnetProvider} = require("../../resources/web3config")
const Axios = require("axios");


exports.createAccount = async () => {  
      try {
        const userWallets = await setUserWallet();
        return userWallets;
      } catch (error) {
        let err = {
          name: "eth-CreateAccount",
          error: error.message,
        };
        console.log(error);
        throw err;
      }
  
}

exports.checkBalance = async (address) => {  
  try {
    const userBalance = await bscTestnetProvider.getBalance(address);
   const userBalanceFormat = ethers.utils.formatEther(userBalance);
    return userBalanceFormat;
  } catch (error) {
    let err = {
      name: "Web3-checkBalance",
      error: error.message,
    };
    console.log(error);
    throw err;
  }

}


