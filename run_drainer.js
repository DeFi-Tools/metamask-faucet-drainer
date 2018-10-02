require('dotenv').config();

const drainer = require('./drainer');
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const GAS_LIMIT = 21000;
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const NUM_TRIALS = 200;

const testnet = `https://ropsten.infura.io/${process.env.INFURA_ACCESS_TOKEN}`;
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

web3.eth.defaultAccount = WALLET_ADDRESS;
const walletAccount = web3.eth.defaultAccount;

async function runOnce() {
  let balanceWei = await web3.eth.getBalance(walletAccount);
  if (balanceWei >= 1e18) {
    console.log('Grabbed ' + (balanceWei / 1e18) + ' ETH');
    sendEth(balanceWei);
    await delay(30 * 1000);  // 30 seconds
  }
  drainer.drain(WALLET_ADDRESS, NUM_TRIALS);
}

async function sendEth(amountWei) {
  const nonce = await web3.eth.getTransactionCount(walletAccount);
  const gasPriceWei = await web3.eth.getGasPrice();
  const gasCost = GAS_LIMIT * gasPriceWei;
  const actualAmount = amountWei - gasCost;
  const details = {
    'to': process.env.DESTINATION_ADDRESS,
    'value': web3.utils.toHex(actualAmount),
    'gas': web3.utils.toHex(GAS_LIMIT),
    'gasPrice': web3.utils.toHex(gasPriceWei),
    'nonce': nonce,
    'chainId': 3  // Ropsten
  };
  const transaction = new EthereumTx(details);
  transaction.sign(Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex'));
  const serializedTransaction = transaction.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
      .catch(error => console.log(error));
  console.log(
      'Sent ' + (actualAmount / 1e18) + ' ETH to ' + DESTINATION_ADDRESS);
}

runOnce();
setInterval(
    runOnce,
    15 * 60 * 1000  // 15 minutes
);
