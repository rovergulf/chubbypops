const {
    CURRENT_NETWORK = 'rinkeby'
} = process.env;

async function main() {
    const chicks = await ethers.getContractFactory('ChubbyPops');
    const factory = await ethers.getContractFactory('ChubbyFactory');

    // OpenSea proxy registry addresses for rinkeby and mainnet.
    let proxyRegistryAddress = "";
    if (CURRENT_NETWORK === 'rinkeby') {
        proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    } else {
        proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    }
    console.log(`Current network: ${CURRENT_NETWORK}; Provider: ${proxyRegistryAddress}`);

    const itemsContract = await chicks.deploy(proxyRegistryAddress);
    await itemsContract.deployed();

    console.log('Items contract deployed to address: ', itemsContract.address);

    const saleContract = await factory.deploy(itemsContract.address, proxyRegistryAddress);
    await saleContract.deployed();

    console.log('Sale contract deployed to address: ', saleContract.address);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

