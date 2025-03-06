// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EchoChain {
    struct MusicToken {
        uint256 tokenId;
        address payable author;
        uint256 price;
        uint256 likes;
    }

    struct Message {
        address sender;
        bytes encryptedContent;
        uint256 timestamp;
    }

    struct Bid {
        address bidder;
        uint256 amount;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => MusicToken) private musicTokens;
    mapping(address => uint256[]) private likedMusic;
    mapping(uint256 => uint256) private totalLikes;
    mapping(uint256 => Message[]) private chatMessages;
    mapping(uint256 => Bid) private highestBids;
    mapping(address => address[]) private followers;
    mapping(uint256 => address) private owners;

    event MusicUploaded(uint256 indexed tokenId, address indexed author, uint256 price);
    event MusicLiked(uint256 indexed tokenId, address indexed liker);
    event MusicBought(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event MessageSent(uint256 indexed tokenId, address indexed sender);
    event NewBidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event Followed(address indexed follower, address indexed artist);

    function uploadMusic(uint256 _price) external {
        uint256 newTokenId = ++_tokenIdCounter;
        musicTokens[newTokenId] = MusicToken(newTokenId, payable(msg.sender), _price, 0);
        owners[newTokenId] = msg.sender;
        emit MusicUploaded(newTokenId, msg.sender, _price);
    }

    function likeMusic(uint256 tokenId) external {
        require(owners[tokenId] != address(0), "Music Token does not exist");
        require(!_hasLiked(msg.sender, tokenId), "Music is already liked");

        musicTokens[tokenId].likes++;
        totalLikes[tokenId]++;
        likedMusic[msg.sender].push(tokenId);
        emit MusicLiked(tokenId, msg.sender);
    }

    function placeBid(uint256 tokenId) external payable {
        require(owners[tokenId] != address(0), "Music Token does not exist");
        require(msg.value > highestBids[tokenId].amount, "Bid must be higher than current bid");

        highestBids[tokenId] = Bid(msg.sender, msg.value);
        emit NewBidPlaced(tokenId, msg.sender, msg.value);
    }

    function acceptBid(uint256 tokenId) external {
        require(owners[tokenId] == msg.sender, "Only the owner can accept bids");
        require(highestBids[tokenId].amount > 0, "No valid bids");

        Bid memory winningBid = highestBids[tokenId];
        payable(msg.sender).transfer(winningBid.amount);
        owners[tokenId] = winningBid.bidder;

        delete highestBids[tokenId];
    }

    function buyMusic(uint256 tokenId) external payable {
        require(owners[tokenId] != address(0), "Music Token does not exist");
        require(owners[tokenId] != msg.sender, "You cannot buy your own music");
        require(msg.value >= musicTokens[tokenId].price, "Insufficient funds");

        address payable previousOwner = payable(owners[tokenId]);
        previousOwner.transfer(musicTokens[tokenId].price);
        owners[tokenId] = msg.sender;
        emit MusicBought(tokenId, msg.sender, musicTokens[tokenId].price);
    }

    function sendMessage(uint256 tokenId, bytes memory encryptedContent) external {
        require(owners[tokenId] != address(0), "Music Token does not exist");
        require(owners[tokenId] == msg.sender || musicTokens[tokenId].author == msg.sender, "Unauthorized sender");
        require(encryptedContent.length > 0, "Message cannot be empty");
        
        chatMessages[tokenId].push(Message(msg.sender, encryptedContent, block.timestamp));
        emit MessageSent(tokenId, msg.sender);
    }

    function followArtist(address artist) external {
        require(artist != msg.sender, "You cannot follow yourself");
        followers[artist].push(msg.sender);
        emit Followed(msg.sender, artist);
    }

    function _hasLiked(address user, uint256 tokenId) internal view returns (bool) {
        for (uint256 i = 0; i < likedMusic[user].length; i++) {
            if (likedMusic[user][i] == tokenId) {
                return true;
            }
        }
        return false;
    }
}
