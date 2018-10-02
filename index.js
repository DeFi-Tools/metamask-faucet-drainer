const drainer = require('./drainer');
const ethereumAddress = require('ethereum-address');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('To earn Ropsten ETH, change the URL to .../<your-address>');
});

app.get('/:address', async (req, res) => {
  const address = req.params.address;

  if (ethereumAddress.isAddress(address)) {
    res.send(await drainer.drain(address));
  } else {
    res.send('Invalid Ethereum address: ' + address);
  }
});

app.listen(3000, () => console.log('Faucet drainer listening on port 3000'));
