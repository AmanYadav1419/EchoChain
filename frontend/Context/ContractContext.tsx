import { ethers } from "ethers";
import { CONTRACT, ECO_CHAIN_ABI } from "./constants.js";

interface Music {
    tokenId: string;
    owner: string;
    author: string;
    price: string;
    likes: string;
    musicName: string;
    imageCID: string;
    audioCID: string;
}

declare global {
    interface Window {
        ethereum?: any;
    }
}

const CONTRACT_ADDRESS = CONTRACT;

// Initialize provider and contract
const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ECO_CHAIN_ABI, signer);
};

// Helper function to check if MetaMask is connected
const checkMetaMask = async (): Promise<void> => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to use this application.");
    }
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
        throw new Error("MetaMask is not connected. Please connect your wallet.");
    }
};

// Function to upload music
export const uploadMusic = async (
    musicName: string,
    imageCID: string,
    audioCID: string,
    price: string
): Promise<void> => {
    try {
        await checkMetaMask();

        if (!musicName || !imageCID || !audioCID || !price) {
            throw new Error("All fields are required to upload music.");
        }

        if (isNaN(Number(price)) || parseFloat(price) <= 0) {
            throw new Error("Price must be a positive number.");
        }

        const contract = getContract();
        const musicInstance = await contract.uploadMusic(
            musicName,
            imageCID,
            audioCID,
            ethers.utils.parseEther(price)
        );
        await musicInstance.wait();
        console.log("Music uploaded successfully!");
    } catch (error: any) {
        console.error("Error uploading music:", error.message || error);
        throw error;
    }
};

// Function to get all music
export const getAllMusic = async (): Promise<Music[]> => {
    try {
        const contract = getContract();
        const allMusic = await contract.getAllMusic();
        return allMusic.map((music: any) => ({
            tokenId: music.tokenId.toString(),
            owner: music.owner,
            author: music.author,
            price: ethers.utils.formatEther(music.price),
            likes: music.likes.toString(),
            musicName: music.musicName,
            imageCID: music.imageCID,
            audioCID: music.audioCID,
        }));
    } catch (error: any) {
        console.error("Error fetching all music:", error.message || error);
        return [];
    }
};

// Function to get music uploaded by the user
export const getMyMusics = async (): Promise<Music[]> => {
    try {
        const contract = getContract();
        const myMusics = await contract.getMyMusics();
        return myMusics.map((music: any) => ({
            tokenId: music.tokenId.toString(),
            owner: music.owner,
            author: music.author,
            price: ethers.utils.formatEther(music.price),
            likes: music.likes.toString(),
            musicName: music.musicName,
            imageCID: music.imageCID,
            audioCID: music.audioCID,
        }));
    } catch (error: any) {
        console.error("Error fetching user's music:", error.message || error);
        return [];
    }
};

// Function to buy music
export const buyMusic = async (tokenId: string, price: string): Promise<void> => {
    try {
        await checkMetaMask();

        if (!tokenId || isNaN(Number(price)) || parseFloat(price) <= 0) {
            throw new Error("Invalid tokenId or price.");
        }

        const contract = getContract();
        const transaction = await contract.buyMusic(tokenId, {
            value: ethers.utils.parseEther(price),
        });
        await transaction.wait();
        console.log(`Music with tokenId ${tokenId} bought successfully!`);
    } catch (error: any) {
        console.error("Error buying music:", error.message || error);
        throw error;
    }
};

// Function to get music bought by the user
export const getMyBoughtMusics = async (): Promise<Music[]> => {
    try {
        const contract = getContract();
        const myBoughtMusics = await contract.getMyBoughtMusics();
        return myBoughtMusics.map((music: any) => ({
            tokenId: music.tokenId.toString(),
            owner: music.owner,
            author: music.author,
            price: ethers.utils.formatEther(music.price),
            likes: music.likes.toString(),
            musicName: music.musicName,
            imageCID: music.imageCID,
            audioCID: music.audioCID,
        }));
    } catch (error: any) {
        console.error("Error fetching bought music:", error.message || error);
        return [];
    }
};

// Function to check if user owns a specific music
export const checkMusicOwnership = async (tokenId: string): Promise<boolean> => {
    try {
        const contract = getContract();
        const boughtMusics = await getMyBoughtMusics();
        return boughtMusics.some(music => music.tokenId === tokenId);
    } catch (error: any) {
        console.error("Error checking music ownership:", error.message || error);
        return false;
    }
};