import { ethers } from "ethers";
import React, { createContext, useState, useContext, useEffect } from "react";
import thetaVidContract from "../contract/abi";

const Web3Context = createContext();

export const Web3provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    try {
      // using ether.js to connect the app with a wallet/account
      const provider = new ethers.BrowserProvider(window.ethereum);
      const loadProvider = async () => {
        if (provider) {
          // window.ethereum.on("chainChanged", () => {
          //   // Chain has changed, so reload the page
          //   window.location.reload();
          // });

          // window.ethereum.on("accountsChanged", () => {
          //   // Accounts have changed, so reload the page
          //   window.location.reload();
          // });

          await provider.send("eth_requestAccounts");
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          // Check if the current network is sepolia
          const network = await provider.getNetwork();
          if (network.chainId !== 0xaa36a7) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0xaa36a7" }],
              });
            } catch (switchError) {
              if (switchError.code === 4902) {
                alert(
                  "cardona zkEVM network not available in your MetaMask. Please add it manually."
                );
              } else {
                console.error("Failed to switch network:", switchError);
              }
            }
          }

          setAccount(address);
          // let contractAddress = "0x7fe89C4112BEF0E3CCDf71D77EC8cEb259fFCBA3";
          let contractAddress = "0x45B1a5f9e7855ce6C6C504b7F7e60e837F42BC00";

          const contract = new ethers.Contract(
            contractAddress,
            thetaVidContract,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } else {
          alert("Metamask not installed");
        }
      };
      provider && loadProvider();
    } catch (error) {
      console.log(error);
    }
  }, [account, contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        setAccount,
        provider,
        setProvider,
        contract,
        setContract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
