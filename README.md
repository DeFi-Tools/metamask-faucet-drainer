# metamask-faucet-drainer

## How to use
Make sure you have both [Node.js](https://nodejs.org) and npm installed.
1. Check that your Node.js is ready
```
node -v
```
2. Get the repository
```
git clone https://github.com/Dominator008/metamask-faucet-drainer.git
cd metamask-faucet-drainer
```
3. Install packages
```
npm i
```
4. Start draining
```
Just drain:
node -e "require('./drain').drainer(<PUT_YOUR_ADDRESS_HERE>)"

Drain and send to a designated address:
node run_drainer.js
```

## Warning
You should not use this if you have no project that require lots of ether for testing. The code is for demonstration so the user must take full responsibility, if the attempt is malicious. Think before doing this.

## Comments
The draining is success if the output has a couple lines of **transaction hash**. Most of the trials might fail and show various kinds of error messages. Ignore them or change your IP or change the address you used.
