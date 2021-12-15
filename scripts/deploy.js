/*
 * Deploy contract
 */

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const chicks = await ethers.getContractFactory('ChubbyPops');

    const contract = await chicks.deploy();
    await contract.deployed();

    console.log('Contract deployed to address: ', contract.address);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

