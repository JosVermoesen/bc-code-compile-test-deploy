const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const secrets = require('./../secrets/secrets');
const provider = new HDWalletProvider(secrets.metamask, secrets.rinkeby);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

// Contract was deployed to:
// 0x285e6B6D6c47Cc391648d78334078b0982112438
// 0xf098FD39ddb0904d17E916c2972551b3fe27EDDe 01/06/2022