// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

contract Chick is ERC721Tradable {
    constructor(address proxyRegistryAddress_) ERC721Tradable("Chubby Pops", "CHUB", proxyRegistryAddress_) {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/chubby-pops/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/chubby-pops";
    }

}
