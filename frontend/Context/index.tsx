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
      const userBuyMusic = await contract?.buyMusic(); 
      const tx = await userBuyMusic.wait();
      console.log("Transaction: ", tx);


    } catch (error) {
      console.error(error);
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