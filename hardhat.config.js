/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');

const {
    PRIVATE_KEY,
    TEST_PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    RINKEBY_API_URL,
    MAINNET_API_URL,
    POLYGON_API_URL,
    MUMBAI_API_URL
} = process.env;

module.exports = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    defaultNetwork: 'rinkeby',
    optimizer: true,
    networks: {
        hardhat: {},
        mainnet: {
            url: MAINNET_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        polygon: {
            url: POLYGON_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        mumbai: {
            url: MUMBAI_API_URL,
            accounts: [`0x${TEST_PRIVATE_KEY}`],
            gasPrice: 8000000000,
        },
        rinkeby: {
            url: RINKEBY_API_URL,
            accounts: [`0x${TEST_PRIVATE_KEY}`]
        },
        localhost: {
            url: 'http://localhost:7545',
            accounts: [`0x${TEST_PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: POLYGONSCAN_API_KEY
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};
