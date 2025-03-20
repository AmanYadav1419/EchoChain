// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Echochain {
    struct MusicToken {
        uint256 tokenId; 
        address payable owner; 
        address payable author; 
        uint256 price; 
        uint256 likes; 
        string musicName;
        string imageCID;
        string audioCID;
    }

    mapping(uint256 => MusicToken) musicTokens;
    uint256 nextTokenId = 1; 


    event MusicUploaded(uint256 indexed tokenId, address indexed author, string musicName);
    event MusicBought(uint256 indexed tokenId, address indexed buyer, uint256 price);


    function uploadMusic(string memory _musicName,string memory _imageCID,string memory _audioCID, uint256 _price) public {
        require(bytes(_musicName).length > 0, "Music name cannot be empty");

        musicTokens[nextTokenId] = MusicToken(
            nextTokenId,
            payable(msg.sender),
            payable(msg.sender),
            _price,
            0,
            _musicName,
            _imageCID,
            _audioCID
        );

        emit MusicUploaded(nextTokenId, msg.sender, _musicName);
        nextTokenId++;
    }


    function getAllMusic() external view returns (MusicToken[] memory) {
        MusicToken[] memory allMusic = new MusicToken[](nextTokenId - 1);

        for (uint256 i = 1; i < nextTokenId; i++) {
            allMusic[i - 1] = musicTokens[i];
        }
        return allMusic;
    }

    function getMyMusics() external view returns (MusicToken[] memory) {
    uint256 count = 0;
    for (uint256 i = 1; i < nextTokenId; i++) {
        if (musicTokens[i].author == msg.sender) {
            count++;
        }
    }
    MusicToken[] memory myMusics = new MusicToken[](count);
    uint256 index = 0;

    for (uint256 i = 1; i < nextTokenId; i++) {
        if (musicTokens[i].author == msg.sender) {
            myMusics[index] = MusicToken(
                musicTokens[i].tokenId,
                musicTokens[i].owner,
                musicTokens[i].author,
                musicTokens[i].price,
                musicTokens[i].likes,
                musicTokens[i].musicName,
                musicTokens[i].imageCID,
                musicTokens[i].audioCID
            );
            index++;
        }
    }
    return myMusics;
}



function buyMusic(uint256 tokenId) external payable {
    MusicToken storage music = musicTokens[tokenId];
    require(music.tokenId != 0, "Music Token does not exist");
    require(music.owner != msg.sender, "You cannot buy your own music");
    require(music.author != msg.sender, "You cannot buy your own music");
    require(msg.value >= music.price, "Insufficient funds to buy");

    address payable previousOwner = music.owner;
    previousOwner.transfer(music.price);
    music.owner = payable(msg.sender);

    emit MusicBought(tokenId, msg.sender, music.price);
}

    function getMyBoughtMusics() external view returns (MusicToken[] memory) {
    uint256 count = 0;

    for (uint256 i = 1; i < nextTokenId; i++) {
        if (musicTokens[i].owner == msg.sender && musicTokens[i].author != msg.sender) {
            count++;
        }
    }

    MusicToken[] memory myBoughtMusics = new MusicToken[](count);
    uint256 index = 0;

    for (uint256 i = 1; i < nextTokenId; i++) {
        if (musicTokens[i].owner == msg.sender && musicTokens[i].author != msg.sender) {
            myBoughtMusics[index] = MusicToken(
                musicTokens[i].tokenId,
                musicTokens[i].owner,
                musicTokens[i].author,
                musicTokens[i].price,
                musicTokens[i].likes,
                musicTokens[i].musicName,
                musicTokens[i].imageCID,
                musicTokens[i].audioCID
            );
            index++;
        }
    }

    return myBoughtMusics;
}

}