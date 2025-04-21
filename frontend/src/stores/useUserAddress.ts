import {useState, useEffect} from 'react';
import {ethers} from "ethers";

interface StateType{
    provider: ethers.BrowserProvider | null;
    signer: any | null;
    contract: ethers.Contract | null;
}

const useUserAddress = () => {
    const [userAddress, setUserAddress] = useState<String | null>(null);
    const [state, setState] = useState<StateType>({
        provider:null,
        signer:null,
        contract:null,
    });

    const SEPOLIA_NETWORK_ID = '11155111';
    const contract_address = "#0xabddhdfbdjua" // currently temporary data is there, store it dynamically, get from the respective file
    const contractABI = "abi.abi" // currently temporary data is there, but store it dynamically, get from the respective file


    useEffect(() => {
        const connectWallet = async () => {
            try {
                const {ethereum} = window;
                if(ethereum){
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    if(ethereum.networkVersion === SEPOLIA_NETWORK_ID){
                        const accounts = await ethereum.request({
                            method:"eth_requestAccounts",
                        });
                        // get the all the details
                        const provider = new ethers.BrowserProvider(ethereum);
                        const signer = await provider.getSigner();
                        const contract = new ethers.Contract(
                            contract_address,
                            contractABI,
                            signer
                        );
                        // set the first account
                        setUserAddress(accounts[0]);
                        setState({provider, signer, contract});
                    } else {
                        setUserAddress("Other Network");
                    }
                } else {
                    setUserAddress(null)
                }
            } catch (error){
                console.log("Error Connecting to the wallet:", error)
            }
        };
        connectWallet();
    }, []);
    return {userAddress, state};
}
export default useUserAddress;