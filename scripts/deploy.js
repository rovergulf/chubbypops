async function main() {
    const ChubbyPops = await ethers.getContractFactory('ChubbyPops');

    const apiAddrPrefix = 'https://api.chubbypops.net';

    const contract = await ChubbyPops.deploy(
        `${apiAddrPrefix}/metadata/`,  // contract metadata url
        `${apiAddrPrefix}/token/`, // revealed token urls
        `${apiAddrPrefix}/factory/`,  // unrevealed tokens url
        '0xE35FA931A0000',
    );

    console.log('Contract deployed to address: ', contract.address);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

