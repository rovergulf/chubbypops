const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/ChubbyPops.sol/ChubbyPops.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'ropsten', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const chubbyPops = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {
    console.log('Minting a new token...');

    const tokenId = await chubbyPops.currentTokenId();
    console.log('Current token id: ', tokenId);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


