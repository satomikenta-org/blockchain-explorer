const router = require('express').Router();
const TxRepo = require('../../repo/tx');
const MySQL = require('../../core/db/mysql');


const asyncWrapper = fn => (...args) => fn(...args).catch(args[2]);

// Get ALL Txs
router.get('/', asyncWrapper( async (req, res, next) => {
  const db = new MySQL();
  const txs = await TxRepo.getAllTx(db);
  res.json(txs);
}));

// Get Transfer Txs
router.get('/transfer', asyncWrapper( async (req, res, next) => {
  const db = new MySQL();
  const txs = await TxRepo.getTransferTx(db);
  res.json(txs);
}));

// Get Mint Txs
router.get('/mint', asyncWrapper( async (req, res, next) => {
  const db = new MySQL();
  const txs = await TxRepo.getMintTx(db);
  res.json(txs);
}));

module.exports = router;