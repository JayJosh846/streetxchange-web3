const { Config } = require("../../utils");
const {
  connectPolygonToken,
  connectEthereumToken,
  connectBinanceToken,
  connectTronToken,
  blockchainTrxAdmin,
  blockchainTrx,
  polygonToken,
  ethereumToken,
  bscToken,
  providerTron,
  tronToken,
} = require("../../resources/web3config.js");
const ethers = require("ethers");
const Utils = ethers.utils;
// const Web3 = require("web3");

// const provider = new Web3.providers.HttpProvider(Config.BLOCKCHAINSERV);

// const web3 = new Web3(provider);

exports.allowance = async (owner, spender, network) => {
  switch (network) {
    case "matic":
      try {
        const result = await connectPolygonToken.methods.allowance(
          owner,
          spender
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Allowance",
          error: error,
        };
        throw err;
      }
      break;
    case "eth":
      try {
        const result = await connectEthereumToken.methods.allowance(
          owner,
          spender
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Allowance",
          error: error,
        };
        throw err;
      }
      break;
    case "bsc":
      try {
        const result = await connectBinanceToken.methods.allowance(
          owner,
          spender
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Allowance",
          error: error,
        };
        throw err;
      }
      break;
    default:
      break;
  }
};



exports.decimals = async (network) => {
  switch (network) {
    case "matic":
      try {
        const result = await connectPolygonToken.methods.decimals();
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Decimals",
          error: error,
        };
        throw err;
      }
      break;
    case "eth":
      try {
        const result = await connectEthereumToken.methods.decimals();
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Decimals",
          error: error,
        };
        throw err;
      }
      break;
    case "bsc":
      try {
        const result = await connectBinanceToken.methods.decimals();
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-Decimals",
          error: error,
        };
        throw err;
      }
      break;
    default:
      break;
  }
};

exports.getBlackListStatus = async (_maker, network) => {
  switch (network) {
    case "matic":
      try {
        const result = await connectPolygonToken.methods.getBlackListStatus(
          _maker
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-GetBlackListStatus",
          error: error,
        };
        throw err;
      }
      break;
    case "eth":
      try {
        const result = await connectEthereumToken.methods.getBlackListStatus(
          _maker
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-GetBlackListStatus",
          error: error,
        };
        throw err;
      }
      break;
    case "bsc":
      try {
        const result = await connectBinanceToken.methods.getBlackListStatus(
          _maker
        );
        // const sendtx = await blockchainTrxAdmin(result, polygonToken, network);
        // return sendtx.status;
        return result;
      } catch (error) {
        let err = {
          name: "Web3-GetBlackListStatus",
          error: error,
        };
        throw err;
      }
      break;
    default:
      break;
  }
};
