// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact team@rovergulf.net
contract ChubbyPops is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    address payable treasurer;

    uint256 public tokenPrice = 40;
    uint256 public maxSupply = 1e4;
    uint256 public maxMintsPerTx = 10; // maximum mints per transaction
    uint256 public airdropSupply = 40 ether; // 40 matic
    bool public airdropDone = false;

    constructor() ERC721("Chubby Pops", "CHIP") {
        treasurer = payable(_msgSender());
    }

    function contractURI() public view returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/chubby-pops";
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/chubby-pops/";
    }

    function airdrop(address[] memory recipients) public onlyOwner {
        require(recipients.length <= airdropSupply, "");
        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _mint(to, tokenId);
        }
    }

    function mint(address to, uint256 amount) public payable {
        require(amount != 0, "Requested amount cannot be zero");
        require(amount <= maxMintsPerTx, "Requested amount is more than maximum");
        if (!airdropDone) {
            uint256 reserve = totalSupply() + airdropSupply;
            require(reserve + amount <= maxSupply, "Total supply will exceed limit");
        } else {
            require(totalSupply() + amount <= maxSupply, "Total supply will exceed limit");
        }
        require((amount * tokenPrice) < msg.value, "Not enough Matic sent");

        for (uint256 i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _mint(to, tokenId);
        }
    }

    function setAirdropsDone() public onlyOwner {
        airdropDone = true;
    }

    function setTokenPrice(uint256 newPrice_) public onlyOwner {
        tokenPrice = newPrice_;
    }

    function currentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    // withdraw
    function claimBalance() public onlyOwner {
        (bool success,) = treasurer.call{value : address(this).balance}("");
        require(success, "transfer failed");
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public view override(ERC721, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
