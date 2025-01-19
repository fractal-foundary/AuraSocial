// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenid;
    Counters.Counter private _tokens_sold;
    address public owner;

    struct NFT_data {
        uint256 tokenid; // uint256: Unique identifier for the NFT
        address owner; // address: Current owner of the NFT
        address sender; // address: Original creator or sender of the NFT
        uint256 price; // uint256: Price of the NFT in wei
        bool outforsale; // bool: Status indicating if the NFT is for sale
        string videoURL; // string: URL of the video associated with the NFT
        string videoName; // string: Name of the video
        string videoDescription; // string: Description of the video
        string videoCategory; // string: Category of the video
        string isvideo; // string: Type of the NFT
    }

    mapping(uint256 => NFT_data) public map;

    constructor() ERC721("NFTMarketplace", "NFTMP") {
        owner = msg.sender;
    }

    function currentid() public view returns (uint256) {
        return _tokenid.current();
    }

    function items_sold() public view returns (uint256) {
        return _tokens_sold.current();
    }

    function createNFT(
        string memory tokenURI,
        uint256 price,
        string memory videoURL,
        string memory videoName,
        string memory videoDescription,
        string memory videoCategory,
        string memory isvideo // New parameter for type
    ) public returns (uint256) {
        uint256 currentTokenId = _tokenid.current();
        _mint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
        mapItem(
            currentTokenId,
            price,
            videoURL,
            videoName,
            videoDescription,
            videoCategory,
            isvideo
        );
        _tokenid.increment();
        return currentTokenId;
    }

    function mapItem(
        uint256 _id,
        uint256 price,
        string memory videoURL,
        string memory videoName,
        string memory videoDescription,
        string memory videoCategory,
        string memory isvideo // New parameter for type
    ) internal {
        _transfer(msg.sender, address(this), _id);
        map[_id] = NFT_data(
            _id,
            address(this),
            msg.sender,
            price,
            true,
            videoURL,
            videoName,
            videoDescription,
            videoCategory,
            isvideo // Assign the type field
        );
    }

    function getNFTDetails(
        uint256 tokenId
    )
        public
        view
        returns (
            uint256,
            address,
            address,
            uint256,
            bool,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory // Return the type field
        )
    {
        NFT_data memory nft = map[tokenId];
        return (
            nft.tokenid,
            nft.owner,
            nft.sender,
            nft.price,
            nft.outforsale,
            nft.videoURL,
            nft.videoName,
            nft.videoDescription,
            nft.videoCategory,
            nft.isvideo // Return the type field
        );
    }

    function resale(uint256 _id) public {
        require(!map[_id].outforsale, "Already up for sale");
        require(map[_id].owner == msg.sender, "Caller is not the owner");
        _transfer(msg.sender, address(this), _id);
        map[_id].owner = address(this);
        map[_id].outforsale = true;
        if (_tokens_sold.current() > 0) {
            _tokens_sold.decrement();
        }
    }

    function setPrice(uint256 id, uint256 price) public {
        require(map[id].sender == msg.sender, "Caller is not the seller");
        map[id].price = price;
    }

    function buyNFT(uint256 _id) public payable {
        require(map[_id].outforsale, "NFT not for sale");
        require(msg.value == map[_id].price, "Incorrect price");
        _transfer(address(this), msg.sender, _id);
        payable(map[_id].sender).transfer(msg.value);
        map[_id].outforsale = false;
        map[_id].owner = msg.sender;
        map[_id].sender = msg.sender;
        _tokens_sold.increment();
    }

    function allMyNFTsNotForSale() public view returns (NFT_data[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenid.current(); i++) {
            if (map[i].owner == msg.sender && !map[i].outforsale) {
                count++;
            }
        }
        NFT_data[] memory temp = new NFT_data[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _tokenid.current(); i++) {
            if (map[i].owner == msg.sender && !map[i].outforsale) {
                temp[index] = map[i];
                index++;
            }
        }
        return temp;
    }

    function allMyNFTs() public view returns (NFT_data[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenid.current(); i++) {
            if (map[i].sender == msg.sender) {
                count++;
            }
        }
        NFT_data[] memory temp = new NFT_data[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _tokenid.current(); i++) {
            if (map[i].sender == msg.sender) {
                temp[index] = map[i];
                index++;
            }
        }
        return temp;
    }

    function nftsForSale() public view returns (NFT_data[] memory) {
        uint256 count = _tokenid.current() - _tokens_sold.current();
        NFT_data[] memory temp = new NFT_data[](count);
        uint256 q = 0;
        for (uint256 i = 0; i < _tokenid.current(); i++) {
            if (map[i].owner == address(this) && map[i].outforsale) {
                temp[q] = map[i];
                q++;
            }
        }
        return temp;
    }

    function stopSale(uint256 _id) public {
        require(map[_id].outforsale, "Not in sale");
        _transfer(address(this), msg.sender, _id);
        map[_id].owner = msg.sender;
        map[_id].outforsale = false;
    }
}
