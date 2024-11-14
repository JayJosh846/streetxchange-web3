const { ethers } = require("ethers");


// BSC Testnet
const bscTestnetProvider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

module.exports = {
    bscTestnetProvider,
}  





// const bitcoin = require('bitcoinjs-lib');
// const ecc = require('tiny-secp256k1')

// const bip32 = require('bip32').fromSeed

// const crypto = require('crypto-js');
// const { ECPairFactory } = require("ecpair");
// const bitcoinClient = require('../configs/bitcoin.config');
// const { transactionFee } = require('../utils');
// const dbInit = require('../../dbconfig/db.init');
// const { User } = require('../../dbconfig/db.models');
// const mempoolJS = require("@mempool/mempool.js")
// const ECPair = ECPairFactory(ecc);
// const axios = require("axios");
// const {encrypt, decrypt} = require("../../encryption");

// class bitcoinService {

//     constructor() { }

//     static createGenesisAccount = async (mnemonic, userId) => {

//         try {
//             await dbInit()
//             const seed = crypto.HmacSHA512(mnemonic, 'mnemonic').toString(crypto.enc.Hex);
//             const seedBuffer = Buffer.from(seed, 'hex'); // Generate the root node from the seed buffer
//             const root = bip32(seedBuffer);

//             const accountNode = root.derivePath(`m/44'/0'/0'`);

//             const network = bitcoin.networks.bitcoin;


//             const childNode = accountNode.derive(0);

//             const keyPair = ECPair.fromWIF(childNode.toWIF());

//             const privateKey = keyPair.privateKey.toString('hex')

//             const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network })

//             const wallet = {
//                 address: address,
//                 privateKey: privateKey
//             }

//             const data = {
//                 wallet: wallet
//             }

//             // try {
//             //     const update = await User.findByIdAndUpdate(userId, { $push: { btcWallets: address } })
//             //     if (!update) {
//             //         throw {
//             //             statusCode: 404,
//             //             message: 'User not found'
//             //         }
//             //     }

//             // } catch (error) {

//             //     let err = {
//             //         statusCode: error.statusCode || 500,
//             //         message: error.message
//             //     }

//             //     throw err;
//             // }

//             return {

//                 statusCode: 200,
//                 message: "Wallet Successfully Created",
//                 data: data
//             }

//         } catch (error) {

//             let err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message
//             }
//             throw err;
//         }
//     }

//     static addNewAccount = async (mnemonic, walletCount, userId) => {

//         try {

//             const seed = crypto.HmacSHA512(mnemonic, 'mnemonic').toString(crypto.enc.Hex);

//             const root = bip32(seed);

//             const accountNode = root.derivePath(`m/44'/0'/${walletCount - 1}'`);

//             const network = bitcoin.networks.bitcoin;

//             const childNode = accountNode.derive(0);

//             const keyPair = ECPair.fromWIF(childNode.toWIF(), network);

//             const privateKey = keyPair.privateKey.toString('hex')

//             const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network })

//             const wallet = {
//                 address: address,
//                 privateKey: privateKey
//             }

//             const data = {
//                 wallet: wallet
//             }

//             try {
//                 await User.findByIdAndUpdate(userId, { $push: { btcWallets: address } })
//             } catch (error) {
//                 let err = {
//                     statusCode: error.statusCode || 500,
//                     message: error.message
//                 }
//                 throw err;
//             }

//             return {
//                 error: false,
//                 statusCode: 200,
//                 message: "Wallet Successfully Created",
//                 data: data
//             }

//         } catch (error) {
//             let err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message
//             }
//             throw err;
//         }

//     }

//     static getBalanceBTC = async (addresses) => {
//         try {


//             const balances = [];

//             for (const addr of addresses) {
//                 console.log(addr)
//                 const { bitcoin: { addresses } } = mempoolJS({
//                     hostname: 'mempool.space',
//                     network: 'testnet'
//                 });

//                 console.log(await addresses.getAddressTxs({address: addr}))
//                 // console.log(bc)
//                 const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address: addr });

//                 let balance = 0;

//                 if (addressTxsUtxo.length > 0) {
//                     balance = addressTxsUtxo.reduce((total, utxo) => total + utxo.value, 0);
//                 }

//                 balances.push({
//                     btcNodeUrl: "https://go.getblock.io/",
//                     account: addr,
//                     balance: (balance / 1e8).toFixed(8)
//                 });
//             }

//             return {
//                 statusCode: 200,
//                 message: "Balances retrieved successfully",
//                 data: balances
//             };
//         } catch (error) {
//             let err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message ? error.message : "Internal Server Error"
//             }
//             throw err;
//         }
//     }

    
//     static transferBTC = async ( event) => {
//         try {
//             const { data } = JSON.parse(event.body);
//             if (!data) {
//                 return {
//                     error: true,
//                     statusCode: 400,
//                     message: "Missing encrypted data"
//                 };
//             }
            
//             const decrypted = await decrypt(data); // Decrypt with private key
            
//             const { sender, receiver, amount, privateKeyHex } = JSON.parse(decrypted);

//             const { bitcoin: { addresses, transactions } } = mempoolJS({
//                 hostname: 'mempool.space',
//                 network: 'testnet'
//             });
    
//             const privateKey = Buffer.from(privateKeyHex, 'hex');
//             const network = bitcoin.networks.testnet;
//             const keyPair = ECPair.fromPrivateKey(privateKey, { network });
//             // console.log(keyPair)
    
//             // Fetch unspent transaction outputs (UTXOs)
//             const addressTxsUtxo = await addresses.getAddressTxsUtxo({ address: sender });
//             console.log(addressTxsUtxo)
//             const psbt = new bitcoin.Psbt({ network });
//             // console.log(psbt)
//             const response = await axios.get(`https://mempool.space/testnet/api/v1/validate-address/${receiver}`)
//             // console.log(response)
//             let inputValue = 0;
//             // console.log("cccc:: ", bitcoin.Script.buildPublicKeyHashOut(receiver).toHex())
//             addressTxsUtxo.forEach((utxo) => {
//                 psbt.addInput({
//                     hash: utxo.txid,
//                     index: utxo.vout,
//                     witnessUtxo: {
//                         script: Buffer.from(response.data.scriptPubKey, 'hex'),
//                         value: utxo.value,
//                     },
//                 });
//                 inputValue += utxo.value;
//             });
            
//             // console.log(psbt)
    
//             const sendAmount = amount; // Amount in satoshis (1 BTC = 100,000,000 satoshis)
//             const fee = 100; // Approximate fee in satoshis (adjust based on the network conditions)
//             const change = inputValue - sendAmount - fee;
    
//             // if (change < 0) {
//             //     throw new Error('Insufficient funds for the transaction.');
//             // }
    
//             // Add the receiver's output
//             psbt.addOutput({
//                 address: receiver,
//                 value: sendAmount,
//             });
    
//             // Add the change output if any
//             // if (change > 0) {
//                 psbt.addOutput({
//                     address: sender,
//                     value: change,
//                 });
//             // }
    
//             // Sign all inputs
//             psbt.signAllInputs(keyPair);
//             psbt.finalizeAllInputs();

//             console.log(psbt.data.inputs)
    
//             const txHex = psbt.extractTransaction().toHex();
//             console.log(txHex);
    
//             // Broadcast the transaction
//             const txid = await transactions.postTx({ txHex });
    
//             // // Notify sender and receiver
//             // const senderToken = getUserDevRegToken(userId, null, "Bitcoin");
//             // const receiverToken = getUserDevRegToken(false, receiver, "Bitcoin");
    
//             // await sendNotification({
//             //     headers: {},
//             //     body: {
//             //         title: "Transfer Successful",
//             //         body: `You have successfully withdrawn ${amount / 1e8} BTC`,
//             //         token: senderToken,
//             //     },
//             // });
    
//             // await sendNotification({
//                 // headers: {},
//                 // body: {
//                 //     title: "Deposit Successful",
//                 //     body: `You have successfully deposited ${amount / 1e8} BTC`,
//                 //     token: receiverToken,
//                 // },
//             // });
    
//             const body = {
//                 title: "Transfer Successfull.",
//                 body: `You have successfully transferred ${amount} ${asset}`,
//                 receiver: receiver
//             }

//             const headers = {}
//             await sendNotification({headers, body})

//             const res = {
//                 txReference: txid,
//                 protocol: "Bitcoin",
//                 side: "Send",
//                 asset: "BTC",
//                 amount: (amount / 1e8).toFixed(8),
//                 status: "Success",
//                 transactionFee: (fee / 1e8).toFixed(8),
//             }

            
//             const encrypted = await encrypt(res);
//             return {
//                 statusCode: 200,
//                 message: "BTC Transferred Successfully",
//                 data: encrypted
//             };
    
//         } catch (error) {
//             console.log(error);
//             const err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error,
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message ? error.message : "Internal Server Error",
//             };
//             throw err;
//         }
//     };
    

//     static fetchAllBTCAccounts = async (mnemonic, walletCounts, btcNodeUrl) => {
//         try {

//             const wallets = []

//             for (let i = 0; i < walletCounts; i++) {

//                 const seed = crypto.HmacSHA512(mnemonic, 'mnemonic').toString(crypto.enc.Hex);

//                 const root = bip32(seed);

//                 const accountNode = root.derivePath(`m/44'/0'/${i}'`);

//                 const network = bitcoin.networks.bitcoin;

//                 const childNode = accountNode.derive(0);

//                 const keyPair = ECPair.fromWIF(childNode.toWIF(), network);

//                 const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network })

//                 const balance = await this.getBalanceBTC([address])

//                 const walletDetails = {
//                     network: btcNodeUrl,
//                     tokenType: "native",
//                     accountAddress: address,
//                     accountIndex: i,
//                     balance: balance[0].balance
//                 }

//                 wallets.push(walletDetails)
//             }

//             return {
//                 statusCode: 200,
//                 message: "Accounts fetched successfully",
//                 data: wallets
//             }
//         } catch (error) {
//             let err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message ? error.message : "Internal Server Error"
//             }
//             throw err;
//         }
//     }

//     static estimateGasFee = async (nodeRpcUrl, amount, transferType, tokenDecimal, tokenAddress, to, functionName, from) => {

//         try {

//             // const Web3Config = new web3Config(nodeRpcUrl)

//             // if (transferType === "ERC20") {

//             //     const parsedAmount = await bigNumber.decimal2wei(amount, tokenDecimal)

//             //     const functionArgs = [to, parsedAmount]

//             //     const contract = await Web3Config.token(tokenAddress)

//             //     const encodeFunctionData = contract.interface.encodeFunctionData(functionName, functionArgs);

//             //     const txObject = {
//             //         tokenAddress: tokenAddress,
//             //         encodeFunctionData: encodeFunctionData,
//             //         from: from,
//             //         Web3Config: Web3Config,
//             //         nodeRpcUrl: nodeRpcUrl
//             //     }

//             //     const gas = await gasManager.estimateGasFunction(txObject);

//             //     const data = {
//             //         txFee: String(gas)
//             //     }
//             //     return {
//             //         statusCode: 200,
//             //         message: "Success",
//             //         data: data
//             //     }
//             // }

//             // else {

//             //     const amountWei = await bigNumber.parseEther(amount)

//             //     const txObject = {
//             //         to: to,
//             //         value: amountWei
//             //     }

//             //     const gas = await gasManager.estimateGasEther(nodeRpcUrl, txObject)
//             const data = {
//                 txFee: String(0.0035)
//             }
//             return {
//                 statusCode: 200,
//                 message: "Success",
//                 data: data
//             }
//         }
//         catch (error) {
//             let err = typeof error === 'string' ? {
//                 statusCode: 400,
//                 message: error
//             } : {
//                 statusCode: error.statusCode ? error.statusCode : 500,
//                 message: error.message ? error.message : "Internal Server Error"
//             }
//             throw err;
//         }



//     }
// }

// module.exports = bitcoinService