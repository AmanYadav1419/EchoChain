import { ethers } from "ethers";
import EchoChainABI from "./EchoChainABI.json"; // Store the ABI here

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address

export const getContract = async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, EchoChainABI, signer);
    } else {
        console.error("Ethereum wallet not found");
    }
};

// start from step 6 : Fetch & Interact with Smart Contract in React