const {
    CURRENT_NETWORK = 'rinkeby',
    OPENSEA_API_KEY,
    API_KEY,
    PRIVATE_KEY,
    FACTORY_CONTRACT_ADDR
} = process.env;

const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/Factory.sol/ChubbyFactory.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(CURRENT_NETWORK, API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const chubbyFactory = new ethers.Contract(FACTORY_CONTRACT_ADDR, contract.abi, signer);

const seaport = new OpenSeaPort(
    signer,
    {
        networkName:
            CURRENT_NETWORK === "mainnet" || CURRENT_NETWORK === "live"
                ? Network.Main
                : Network.Rinkeby,
        apiKey: OPENSEA_API_KEY,
    },
    (arg) => console.log(arg)
);

async function main() {
    const pricePerItem = 0.02;

    const numOptions = await chubbyFactory.numOptions();

    for (let i = 0; i < numOptions; i++) {
        console.log("Creating fixed price auctions...");
        const fixedSellOrders = await seaport.createFactorySellOrders({
            assets: [
                {
                    tokenId: i,
                    tokenAddress: FACTORY_CONTRACT_ADDR,
                },
            ],
            accountAddress: signer.accountAddress,
            factoryAddress: FACTORY_CONTRACT_ADDR,
            startAmount: pricePerItem + (pricePerItem * i),
            numberOfOrders: 10,
        });
        console.log(`Successfully made ${fixedSellOrders.length} fixed-price sell orders!\n` + `
        ${fixedSellOrders[0].asset.openseaLink}`);
    }
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

