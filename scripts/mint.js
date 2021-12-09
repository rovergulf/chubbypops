const {API_KEY, PRIVATE_KEY, FACTORY_CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/Factory.sol/ChubbyFactory.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const chubbyFactory = new ethers.Contract(FACTORY_CONTRACT_ADDR, contract.abi, signer);

async function main() {
    console.log('Minting a new token...');

    // mint one to contract owner address
    const tx = await chubbyFactory.mintTo(0, signer.address);
    await tx.wait();

    console.log('Successfully minted token');
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


