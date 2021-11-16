const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/ChubbyPops.sol/ChubbyPops.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const chubbyPops = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {

    const saleActive = await chubbyPops.saleActive();
    console.log(`Sale active state: : ${saleActive}`);
    const isPreSaleActive = await chubbyPops.preSaleActive();
    console.log(`Pre-sale active state: : ${isPreSaleActive}`);
    const isRevealed = await chubbyPops.revealed();
    console.log(`Tokens revealed: : ${isRevealed}`);

    // const tx1 = await chubbyPops.togglePreSaleState();
    // await tx1.wait();
    // console.log(`Successfully changed pre-sale state to : ${!isPreSaleActive}`);
    //
    // const tx2 = await chubbyPops.toggleSaleState();
    // await tx2.wait();
    // console.log(`Successfully changed sale state to : ${!saleActive}`);
    //
    // const tx3 = await chubbyPops.toggleRevealedState();
    // await tx3.wait();
    // console.log(`Successfully revealed state to: ${!saleActive}`);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


