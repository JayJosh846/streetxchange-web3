require('dotenv').config();
const bitcoin = require("bitcoinjs-lib");
const ecc = require("tiny-secp256k1");
const { ECPairFactory } = require("ecpair");
const { BIP32Factory } = require('bip32')
const bip32 = require('bip32')
const bip39 = require('bip39')

// You must wrap a tiny-secp256k1 compatible implementation

exports.createAccount = async () => {  
  try {
    const bip32 = BIP32Factory(ecc)
    let network; //use networks.testnet for testnet

    if (process.env.NODE_ENV == 'development') {
      network = bitcoin.networks.testnet
    }
    if (process.env.NODE_ENV == 'production') {
      network = bitcoin.networks.bitcoin
    }

    // Derivation path
    const path = `m/49'/1'/0'/0` // Use m/49'/1'/0'/0 for testnet
    
    let mnemonic = bip39.generateMnemonic()
    console.log("n1", mnemonic)
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    let root = bip32.fromSeed(seed, network)
    
    let account = root.derivePath(path)
    let node = account.derive(0).derive(0)
    
    let btcAddress = bitcoin.payments.p2wpkh({
      pubkey: node.publicKey,
      network: network,
    }).address
    
    console.log(`
    Wallet generated:
     - Address  : ${btcAddress},
     - Key : ${node.toWIF()}, 
     - Mnemonic : ${mnemonic}
         
    `)
    const convertNode = node.toWIF()
    const resultObject = {btcAddress, convertNode, mnemonic}
    return resultObject;
  } catch (error) {
    let err = {
      name: "btc-CreateAccount",
      error: error.message,
    };
    console.log(error);
    throw err;
  }
}