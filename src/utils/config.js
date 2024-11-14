require('dotenv').config();

exports.Config = {

  ADMIN:
    process.env.NODE_ENV == 'production'
      ? process.env.ADMIN
      : process.env.ADMIN_TEST,

  ADMIN_PASS:
    process.env.NODE_ENV == 'production'
      ? process.env.ADMIN_PASS
      : process.env.ADMIN_PASS_TEST,

  TRON_ADMIN:
    process.env.NODE_ENV == 'production'
      ? process.env.TRON_ADMIN
      : process.env.TRON_ADMIN_TEST,

  TRON_ADMIN_PASS:
    process.env.NODE_ENV == 'production'
      ? process.env.TRON_ADMIN_PASS
      : process.env.TRON_ADMIN_PASS_TEST,

  BLOCKCHAINSERV_POLYGON:
    process.env.NODE_ENV == 'production'
      ? process.env.BLOCKCHAINSERV
      : process.env.BLOCKCHAINSERV_POLYGON_TEST,

  BLOCKCHAINSERV_ETHEREUM:
    process.env.NODE_ENV == 'production'
      ? process.env.BLOCKCHAINSERV_ETHEREUM :
      process.env.BLOCKCHAINSERV_ETHEREUM_TEST,

  BLOCKCHAINSERV_BINANCE:
    process.env.NODE_ENV == 'production'
      ? process.env.BLOCKCHAINSERV_BINANCE :
      process.env.BLOCKCHAINSERV_BINANCE_TEST,

  CONTRACTADDR_POLYGON:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR_POLYGON :
      process.env.CONTRACTADDR_POLYGON_TEST,

  CONTRACTADDR_ETHEREUM:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR_ETHEREUM :
      process.env.CONTRACTADDR_ETHEREUM_TEST,

  CONTRACTADDR_BINANCE:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR_BINANCE :
      process.env.CONTRACTADDR_BINANCE_TEST,

  CONTRACTADDR_TRON:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR_TRON :
      process.env.CONTRACTADDR_TRON_TEST,

  TRON_FULL_HOST:
    process.env.NODE_ENV == 'production'
      ? process.env.TRON_FULL_HOST :
      process.env.TRON_FULL_HOST_TEST,

  CONTRACTADDR_GETTER:
    process.env.NODE_ENV == 'production'
      ? process.env.CONTRACTADDR_GETTER :
      process.env.CONTRACTADDR_GETTER_TEST,



  // BANTU
  BANTU_NETWORK:
    process.env.NODE_ENV == "production"
      ? "https://expansion.bantu.network"
      : "https://expansion-testnet.bantu.network",

  BANTU_NETWORK_PASSPHRASE:
    process.env.NODE_ENV == "production"
      ? process.env.BANTU_NETWORK_PASSPHRASE
      : process.env.BANTU_NETWORK_PASSPHRASE_TEST,

  DISTRIBUTION_SECRET_KEY:
    process.env.NODE_ENV == "production"
      ? process.env.DISTRIBUTION_SECRET_KEY
      : process.env.DISTRIBUTION_SECRET_KEY_TEST,


  ASSET_CODE: process.env.ASSET_CODE || "CNGN",

  ISSUER_ADDRESS:
    process.env.NODE_ENV == "production"
      ? process.env.ISSUER_ACCOUNT
      : process.env.ISSUER_ACCOUNT_TEST,

  DISTRIBUTION_PUBLIC_KEY:
    process.env.NODE_ENV == "production"
      ? process.env.DISTRIBUTION_PUBLIC_KEY
      : process.env.DISTRIBUTION_PUBLIC_KEY_TEST,

  MPC_BASE_URL:
    process.env.NODE_ENV == 'production'
      ? process.env.MPC_BASE_URL :
      process.env.MPC_BASE_URL_TEST,

  TRON_API_KEY: process.env.TRON_API_KEY,
  ADMIN_PARTIAL_KEY: process.env.ADMIN_PARTIAL_KEY,



  WHITELISTDOMAINS: [
    "172.31.22.207",
    "https://172.31.22.207",
    "3.138.231.35",
    "https://3.138.231.35",
  ],

}
