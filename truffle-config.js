require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = process.env.MNEMONIC;
const BLOCKCHAINSERV_POLYGON = process.env.BLOCKCHAIN_POLYGON_TEST;

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    
    // Used for the BSC network
    binance: {
      provider: new HDWalletProvider(MNEMONIC, BLOCKCHAINSERV_POLYGON),
      network_id: "*",
      gas: 0,
      gasPrice: 0,
      // production: true,
      confirmations: 10,
      timeoutBlocks: 400,
      skipDryRun: true, 
      networkCheckTimeout: 10000000
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    },
  },
};
