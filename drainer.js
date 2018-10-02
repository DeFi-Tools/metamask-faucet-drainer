const request = require('request');

function Options(address) {
  const options = {
    method: 'POST',
    url: 'https://faucet.metamask.io/',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Length': '42',
      Connection: 'keep-alive',
      Cookie: '_ga=GA1.2.961283661.1521136489',
      Referer: 'https://faucet.metamask.io/',
      Accept: '*/*',
      'Content-Type': 'application/rawdata',
      'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7,zh-CN;q=0.6',
      Host: 'faucet.metamask.io',
      'Accept-Encoding': 'gzip, deflate, br',
      Origin: 'https://faucet.metamask.io'
    },
    body: address
  };
  return options;
}

module.exports = {
  drain: async function(address, numTrials) {
    const logs = [];
    for (let i = 0; i < numTrials; i++) {
      await request(Options(address), function(error, response, body) {
        if (error) {
          throw new Error(error);
        }
        console.log(body);
        logs.push(body);
      });
    }

    if (logs.length == 0) {
      return 'Nothing in logs';
    } else if (logs.length >= 100) {
      return logs;
    } else {
      return 'Error';
    }
  }
};
