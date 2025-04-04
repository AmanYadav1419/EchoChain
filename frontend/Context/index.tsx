import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect
} from "react";

import { ethers, Contract, Signer, providers } from "ethers";
import {
  useAccount,
  useWalletClient,
  useAccountEffect,
} from "wagmi";
import { ECO_CHAIN_ABI, CONTRACT } from "./constants";

// Define types for the context value
interface ContractContextValue {
  address: string | undefined;
  signer?: Signer | null;
  contract?: Contract | null;
  buyMusic?: () => Promise<void>;
}

// Create the context with a default value
const ContractContext = createContext<ContractContextValue | null>(null);

// Define props for the ContractProvider component
interface ContractProviderProps {
  children: React.ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [signer, setSigner] = useState<Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const { isConnected, address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();

  useLayoutEffect(() => {
    try {
      const rpcProvider = walletClient?.transport || "https://rpc.ankr.com/eth";
      const provider = walletClient?.transport
        ? new ethers.providers.Web3Provider(walletClient.transport)
        : new ethers.providers.JsonRpcProvider(rpcProvider);
      const signer = provider.getSigner();
      const newContract = walletClient?.transport
        ? new ethers.Contract(CONTRACT, ECO_CHAIN_ABI, signer)
        : new ethers.Contract(CONTRACT, ECO_CHAIN_ABI, provider);
      setSigner(signer);
      setContract(newContract);

      console.log("Contract meow: ", contract);
    } catch (error) {
      console.error(error);
    }
  }, [walletClient]);

  

  const buyMusic = async () => {
    if (!contract || !address) {
      console.log("Contract or Address not initialized!!!");
    }
    try {
      // const song_id = 
      // const ImageCID = 
      const userBuyMusic = await contract?.buyMusic(); 
      const tx = await userBuyMusic.wait();
      console.log("Transaction: ", tx);


    } catch (error) {
      console.error(error);
    }
  };

  // functions return by aman , in future remove it 

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

  return (
    <ContractContext.Provider
      value={{
        address,
        signer,
        contract,
        buyMusic,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use the ContractContext
export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContractContext must be used within a ContractProvider");
  }
  return context;
};