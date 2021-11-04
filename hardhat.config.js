/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const {ROPSTEN_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, MAINNET_API_URL} = process.env;

module.exports = {
    solidity: "0.8.9",
    defaultNetwork: 'ropsten',
    optimizer: true,
    networks: {
        hardhat: {},
        mainnet: {
            url: MAINNET_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        ropsten: {
            url: ROPSTEN_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        localhost: {
            url: 'http://localhost:7545',
            accounts: [`0x${PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    }
};
