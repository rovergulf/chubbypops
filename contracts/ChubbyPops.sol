// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ChubbyPops is ERC721Enumerable, AccessControl, Ownable {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // address to keep funds at
    address payable treasurer;

    string public _contractURI;  // contract metadata url
    string public _baseTokenURI; // tokens metadata url
    string public _factoryURI;   // unrevealed token metadata url

    uint256 internal _cap = 1e5;

    // restricting values
    uint256 public maxMintsPerTx = 10;           // maximum mints per transaction
    uint256 public maxSaleMintPerAccount = 12;   // maximum of tokens address can hold
    uint256 public maxPreSaleMintPerAccount = 5; // maximum of tokens available by presale

    // mint token price
    uint256 public tokenPrice;

    // contract states
    bool public revealed = false;
    bool public saleActive = false;
    bool public preSaleActive = false;

    event Mint(address recipient, uint256 tokenId);

    mapping(address => uint256) private presaleAddressMintedAmount; // number of mints for each wallet during pre-sale
    mapping(address => uint256) private publicAddressMintedAmount;  // number of mints for each wallet during public sale

    constructor(
        string memory contractUri_,
        string memory tokenUri_,
        string memory factoryUri_,
        uint256 tokenPrice_
    ) public ERC721("Chubby Pops", "CHP") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());

        _contractURI = contractUri_;
        _baseTokenURI = tokenUri_;
        _factoryURI = factoryUri_;
        tokenPrice = tokenPrice_;
        treasurer = payable(_msgSender());
    }

    // set base contract metadata url
    function setContractURI(string memory contractUri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721Collection: Caller is not admin");

        _contractURI = contractUri;
    }

    // set base url for tokens metadata
    function setBaseTokenURI(string memory baseURI_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721Collection: Caller is not admin");

        _baseTokenURI = baseURI_;
    }

    // set base url for tokens factory, which is active if tokens not revealed yet
    function setFactoryURI(string memory factoryURI_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC721Collection: Caller is not admin");

        _factoryURI = factoryURI_;
    }

    // returns base token uri
    function _baseURI() internal view virtual override returns (string memory) {
        return revealed ? _baseTokenURI : _factoryURI;
    }

    // returns value of contract metadata url
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    // returns last minted token id
    function currentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    // safely mints token to specified address available only to minters,
    // which can be used for giveaways
    function devMint(
        address recipient,
        uint256 amount
    ) public {
        // check internal role at first
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC721Collection: must have minter role to mint");

        // check contract availability
        require(amount != 0, "ERC721Collection: Requested amount cannot be zero");
        require(amount <= maxMintsPerTx, "ERC721Collection: Requested amount is more than maximum");
        require(totalSupply() + amount <= _cap, "ERC721Collection: Total supply will exceed limit");

        for (uint256 i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _mint(recipient, newTokenId);
            emit Mint(recipient, newTokenId);
        }
    }

    // payable public mint
    function mint(
        address recipient,
        uint256 amount
    ) public payable {
        // is sale active
        if (saleActive) {
            // check recipient limits
            uint256 publicOwned = publicAddressMintedAmount[recipient];
            bool saleLimit = saleActive && (publicOwned + amount <= maxSaleMintPerAccount);
            require(saleLimit, "ERC721Collection: Owner limit of public sale tokens is exceed");
        }
        // is pre-sale active
        if (preSaleActive) {
            uint256 presaleOwned = presaleAddressMintedAmount[recipient];
            bool presaleLimit = preSaleActive && (presaleOwned + amount <= maxPreSaleMintPerAccount);
            require(presaleLimit, "ERC721Collection: Owner limit of pre-sale tokens is exceed");
        }
        // other validations
        require(amount > 0, "ERC721Collection: Requested amount cannot be zero");
        require(amount <= maxMintsPerTx, "ERC721Collection: Requested amount is more than maximum");
        require(recipient != address(0), "ERC721Collection: Cannot be minted to zero address");
        require(totalSupply() + amount <= _cap, "ERC721Collection: Total supply will exceed limit");
        require((amount * tokenPrice) < msg.value, "ERC721Collection: Not enough Ether sent");

        for (uint256 i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _mint(recipient, newTokenId);
            if (preSaleActive) {
                presaleAddressMintedAmount[recipient]++;
            } else {
                publicAddressMintedAmount[recipient]++;
            }
            emit Mint(recipient, newTokenId);
        }
    }


    // toggle on/off pre-sale state, to reveal token actual metadata
    function togglePresaleState() public onlyOwner {
        preSaleActive = !preSaleActive;
    }

    // toggle on/off sale state, to reveal token actual metadata
    function toggleSaleState() public onlyOwner {
        saleActive = !saleActive;
    }

    // toggle revealed tokens state
    function toggleRevealedState() public onlyOwner {
        revealed = !revealed;
    }

    // let owners to burn their tokens
    function burn(uint256 tokenId) public {
        require(_msgSender() == ownerOf(tokenId), "ERC721Collection: Cannot be burned only by token owner");
        _burn(tokenId);
    }

    // set max amount of public sold tokens an address can keep
    function setMaxPerSale(uint256 amount) public onlyOwner {
        maxSaleMintPerAccount = amount;
    }

    // set max amount of pre-sold tokens an address can keep
    function setMaxPerPreSale(uint256 amount) public onlyOwner {
        maxPreSaleMintPerAccount = amount;
    }

    // set max amount of mints available per tx
    function setMaxMintsPerTx(uint256 amount) public onlyOwner {
        maxMintsPerTx = amount;
    }

    // withdraw ether
    function claimBalance() public onlyOwner {
        (bool success,) = treasurer.call{value : address(this).balance}("");
        require(success, "transfer failed");
    }

    // change treasurer account
    function setTreasurer(address payable newAddress) public onlyOwner {
        treasurer = newAddress;
    }

    // See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}
