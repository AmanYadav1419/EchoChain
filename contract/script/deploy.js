// Import the ethers library from Hardhat
const { ethers } = require("hardhat");

// Main function to deploy the contract
async function main() {
    // Get the contract factory for Echochain
    const EchoChain = await ethers.getContractFactory("Echochain");
    // Deploy the contract
    const echoChain = await EchoChain.deploy();
    // Wait for the contract to be deployed
    await echoChain.deployed();

    // Log the address of the deployed contract
    console.log(`EchoChain deployed to: ${echoChain.address}`);

    // the below code some functions of the contract can not work properly as the 
    // integration of ipfs is not done yet.
    // if possible please do it to. - by aman yadav
    
    // Testing the contract
    // Upload a music token
    let tx = await echoChain.uploadMusic("Test Music", "imageCID", "audioCID", ethers.utils.parseEther("1"));
    await tx.wait();
    console.log("Music uploaded");

    // Get all music tokens
    let allMusic = await echoChain.getAllMusic();
    console.log("All Music:", allMusic);

    // Like the music token
    tx = await echoChain.likeMusic(1);
    await tx.wait();
    console.log("Music liked");

    // Get liked music by user
    let likedMusic = await echoChain.getLikedMusicByUser();
    console.log("Liked Music:", likedMusic);

    // Get total likes for the music token
    let totalLikes = await echoChain.getTotalLikes(1);
    console.log("Total Likes:", totalLikes);

    // Buy the music token
    tx = await echoChain.buyMusic(1, { value: ethers.utils.parseEther("1") });
    await tx.wait();
    console.log("Music bought");

    // Get my bought musics
    let myBoughtMusics = await echoChain.getMyBoughtMusics();
    console.log("My Bought Musics:", myBoughtMusics);

    // Unlike the music token
    tx = await echoChain.unlikeMusic(1);
    await tx.wait();
    console.log("Music unliked");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
