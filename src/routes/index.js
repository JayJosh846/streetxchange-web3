const homeRouter = require('./home.js');
const ethRouther = require('./networks/eth/controllers/index.js');
const btcRouther = require('./networks/btc/controllers/index.js');


const express = require('express');
const { Router } = express;
const router = Router();

// Blockchain File Management 
router.use('/', homeRouter)
router.use('/web3/eth', ethRouther)
router.use('/web3/btc', btcRouther)


module.exports = router;
