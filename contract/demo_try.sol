// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Echochain_demo1 {
    struct Music {
        uint256 id;
        address artist;
        string title;
        uint256 price;
        bool isActive;
    }

    struct Purchase {
        uint256 musicId;
        address buyer;
        uint256 timestamp;
    }

    mapping(uint256 => Music) public musics;
    mapping(address => Purchase[]) public purchases;
    
    uint256 private musicCounter;
    
    event MusicUploaded(uint256 indexed id, address indexed artist, string title, uint256 price);
    event MusicPurchased(uint256 indexed id, address indexed buyer, address indexed artist, uint256 price);

    function uploadMusic(string memory _title, uint256 _price) public returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        require(bytes(_title).length > 0, "Title cannot be empty");
        
        musicCounter++;
        
        musics[musicCounter] = Music({
            id: musicCounter,
            artist: msg.sender,
            title: _title,
            price: _price,
            isActive: true
        });

        emit MusicUploaded(musicCounter, msg.sender, _title, _price);
        return musicCounter;
    }

    function buyMusic(uint256 _musicId) public payable {
        Music storage music = musics[_musicId];
        require(music.isActive, "Music is not active");
        require(msg.value >= music.price, "Insufficient payment");
        require(music.artist != msg.sender, "Cannot buy your own music");

        // Transfer payment to artist
        payable(music.artist).transfer(msg.value);
        
        // Record purchase
        purchases[msg.sender].push(Purchase({
            musicId: _musicId,
            buyer: msg.sender,
            timestamp: block.timestamp
        }));

        emit MusicPurchased(_musicId, msg.sender, music.artist, msg.value);
    }

    function getMyBoughtMusics() public view returns (Purchase[] memory) {
        return purchases[msg.sender];
    }
}
