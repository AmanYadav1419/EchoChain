import { ethers } from "ethers";
import { CONTRACT, ECO_CHAIN_ABI } from "../Context/constants.js";

const CONTRACT_ADDRESS = CONTRACT;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, ECO_CHAIN_ABI, signer);

// Helper function to check if MetaMask is connected
const checkMetaMask = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install MetaMask to use this application.");
  }
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts.length === 0) {
    throw new Error("MetaMask is not connected. Please connect your wallet.");
  }
};

// Function to upload music
export const uploadMusic = async (musicName, imageCID, audioCID, price) => {
  try {
    await checkMetaMask();

    if (!musicName || !imageCID || !audioCID || !price) {
      throw new Error("All fields are required to upload music.");
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      throw new Error("Price must be a positive number.");
    }

    const musicInstance = await contract.uploadMusic(
      musicName,
      imageCID,
      audioCID,
      ethers.utils.parseEther(price)
    );
    await musicInstance.wait();
    console.log("Music uploaded successfully!");
  } catch (error) {
    console.error("Error uploading music:", error.message || error);
    throw error;
  }
};

// Function to get all music
export const getAllMusic = async () => {
  try {
    await checkMetaMask();

    const allMusic = await contract.getAllMusic();
    return allMusic.map((music) => ({
      tokenId: music.tokenId.toString(),
      owner: music.owner,
      author: music.author,
      price: ethers.utils.formatEther(music.price),
      likes: music.likes.toString(),
      musicName: music.musicName,
      imageCID: music.imageCID,
      audioCID: music.audioCID,
    }));
  } catch (error) {
    console.error("Error fetching all music:", error.message || error);
    return [];
  }
};

// Function to get music uploaded by the user
export const getMyMusics = async () => {
  try {
    await checkMetaMask();

    const myMusics = await contract.getMyMusics();
    return myMusics.map((music) => ({
      tokenId: music.tokenId.toString(),
      owner: music.owner,
      author: music.author,
      price: ethers.utils.formatEther(music.price),
      likes: music.likes.toString(),
      musicName: music.musicName,
      imageCID: music.imageCID,
      audioCID: music.audioCID,
    }));
  } catch (error) {
    console.error("Error fetching user's music:", error.message || error);
    return [];
  }
};

// Function to buy music
export const buyMusic = async (tokenId, price) => {
  try {
    await checkMetaMask();

    if (!tokenId || isNaN(price) || parseFloat(price) <= 0) {
      throw new Error("Invalid tokenId or price.");
    }

    const transaction = await contract.buyMusic(tokenId, {
      value: ethers.utils.parseEther(price),
    });
    await transaction.wait();
    console.log(`Music with tokenId ${tokenId} bought successfully!`);
  } catch (error) {
    console.error("Error buying music:", error.message || error);
    throw error;
  }
};

// Function to get music bought by the user
export const getMyBoughtMusics = async () => {
  try {
    await checkMetaMask();

    const myBoughtMusics = await contract.getMyBoughtMusics();
    return myBoughtMusics.map((music) => ({
      tokenId: music.tokenId.toString(),
      owner: music.owner,
      author: music.author,
      price: ethers.utils.formatEther(music.price),
      likes: music.likes.toString(),
      musicName: music.musicName,
      imageCID: music.imageCID,
      audioCID: music.audioCID,
    }));
  } catch (error) {
    console.error("Error fetching bought music:", error.message || error);
    return [];
  }
};