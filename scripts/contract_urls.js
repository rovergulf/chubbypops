const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/ChubbyPops.sol/ChubbyPops.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'ropsten', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const chubbyPops = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {

    const currentContractUrl = await chubbyPops.contractURI();
    console.log(`Current contract metadata API url: ${currentContractUrl}. Changing...`);
    //
    const nextContractUri = `https://api.chubbypops.com/metadata/`;
    const tx1 = await chubbyPops.setContractURI(nextContractUri);
    await tx1.wait();
    console.log(`Successfully changed contract url to: ${nextContractUri}`);

    const currentFactoryUrl = await chubbyPops._factoryURI();
    console.log(`Current factory API url: ${currentFactoryUrl}. Changing...`);
    const nextFactoryUri = `https://api.chubbypops.com/factory/`;
    const tx2 = await chubbyPops.setFactoryURI(nextFactoryUri);
    await tx2.wait();
    console.log(`Successfully changed contract url to: ${nextFactoryUri}`);

    const currentTokenUrl = await chubbyPops._baseTokenURI();
    console.log(`Current tokens API url: ${currentTokenUrl}. Changing...`);
    const nextTokenUri = `https://api.chubbypops.com/token/`;
    const tx3 = await chubbyPops.setBaseTokenURI(nextTokenUri);
    await tx3.wait();
    console.log(`Successfully changed contract url to: ${nextTokenUri}`);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


