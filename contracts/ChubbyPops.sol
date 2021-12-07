// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC721Tradeable.sol";

/// @custom:security-contact support@rovergulf.net
contract ChubbyPops is ERC721Tradeable {

    constructor(address proxyRegistryAddress_) ERC721Tradeable("Chubby Pops", "CHIP", proxyRegistryAddress_) {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/test-chubbies/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/test-chubbies";
    }

}
