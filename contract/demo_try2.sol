// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EchoChain is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;

    Counters.Counter private _tokenIds;

    struct MusicToken {
        uint256 tokenId; // Unique identifier for each music NFT
        address payable author; // Address of the creator
        uint256 price; // Price set by the creator
        uint256 likes; // Number of likes received
    }

    struct Message {
        address sender; // Sender's address
        bytes encryptedContent; // Encrypted message content for privacy
        uint256 timestamp; // Time when message was sent
    }

    struct Bid {
        address bidder; // Address of the highest bidder
        uint256 amount; // Amount of the highest bid
    }

    mapping(uint256 => MusicToken) private musicTokens; // Mapping of tokenId to MusicToken details
    mapping(address => uint256[]) private likedMusic; // Tracks which music each user has liked
    mapping(uint256 => uint256) private totalLikes; // Tracks total likes per music NFT
    mapping(uint256 => Message[]) private chatMessages; // Stores encrypted chat messages for each music NFT
    mapping(uint256 => Bid) private highestBids; // Tracks the highest bid for each token
    mapping(address => address[]) private followers; // Tracks followers of each artist

    event MusicUploaded(uint256 indexed tokenId, address indexed author, string musicURI);
    event MusicLiked(uint256 indexed tokenId, address indexed liker);
    event MusicBought(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event MessageSent(uint256 indexed tokenId, address indexed sender, bytes encryptedContent);
    event NewBidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event Followed(address indexed follower, address indexed artist);

    constructor() ERC721("EchoChainMusic", "ECM") {}

    // Upload new music NFT with a unique URI and price
    function uploadMusic(string memory musicURI, uint256 _price) external {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, musicURI);

        musicTokens[newTokenId] = MusicToken(newTokenId, payable(msg.sender), _price, 0);
        emit MusicUploaded(newTokenId, msg.sender, musicURI);
    }

    // Allow users to like a music NFT, ensuring they haven't liked it before
    function likeMusic(uint256 tokenId) external {
        require(_exists(tokenId), "Music Token does not exist");
        require(!_hasLiked(msg.sender, tokenId), "Music is already liked");

        musicTokens[tokenId].likes++;
        totalLikes[tokenId]++;
        likedMusic[msg.sender].push(tokenId);
        emit MusicLiked(tokenId, msg.sender);
    }

    // Allow users to place bids on music NFTs instead of direct purchase
    function placeBid(uint256 tokenId) external payable {
        require(_exists(tokenId), "Music Token does not exist");
        require(msg.value > highestBids[tokenId].amount, "Bid must be higher than current bid");

        highestBids[tokenId] = Bid(msg.sender, msg.value);
        emit NewBidPlaced(tokenId, msg.sender, msg.value);
    }

    // Allow the owner to accept the highest bid and transfer the NFT
    function acceptBid(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can accept bids");
        require(highestBids[tokenId].amount > 0, "No valid bids");

        Bid memory winningBid = highestBids[tokenId];
        payable(msg.sender).transfer(winningBid.amount);
        _transfer(msg.sender, winningBid.bidder, tokenId);

        delete highestBids[tokenId];
    }

    // Direct purchase of music NFT at fixed price
    function buyMusic(uint256 tokenId) external payable {
        require(_exists(tokenId), "Music Token does not exist");
        require(ownerOf(tokenId) != msg.sender, "You cannot buy your own music");
        require(msg.value >= musicTokens[tokenId].price, "Insufficient funds");

        address payable previousOwner = payable(ownerOf(tokenId));
        previousOwner.transfer(musicTokens[tokenId].price);
        _transfer(previousOwner, msg.sender, tokenId);
        emit MusicBought(tokenId, msg.sender, musicTokens[tokenId].price);
    }

    // Enable private encrypted chat between buyers and authors
    function sendMessage(uint256 tokenId, bytes memory encryptedContent) external {
        require(_exists(tokenId), "Music Token does not exist");
        require(ownerOf(tokenId) == msg.sender || musicTokens[tokenId].author == msg.sender, "Only buyer or author can send messages");
        require(encryptedContent.length > 0, "Message cannot be empty");
        
        chatMessages[tokenId].push(Message(msg.sender, encryptedContent, block.timestamp));
        emit MessageSent(tokenId, msg.sender, encryptedContent);
    }

    // Allow users to follow their favorite artists for updates
    function followArtist(address artist) external {
        require(artist != msg.sender, "You cannot follow yourself");
        followers[artist].push(msg.sender);
        emit Followed(msg.sender, artist);
    }

    // Check if a user has already liked a particular music NFT
    function _hasLiked(address user, uint256 tokenId) internal view returns (bool) {
        for (uint256 i = 0; i < likedMusic[user].length; i++) {
            if (likedMusic[user][i] == tokenId) {
                return true;
            }
        }
        return false;
    }
}
