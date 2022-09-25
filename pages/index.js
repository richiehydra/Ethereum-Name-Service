import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers"
export default function  Home()
  {
  const [ens, setEns] = useState("");
  const [currentAddress, setAddress] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const chainid = await ethereum.request({ method: "eth_chainId" });
        const GoerliChainId = "0x5";
        if (chainid != GoerliChainId) {
          alert("Please Connect To Goerli Network")
          setCorrectNetwork(false)
        }
        else {
          setCorrectNetwork(true);
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          const account = accounts[0];
          setAddress(account);
        }
      }
    }
      catch(err)
      {

       console.log(err)
      }
    }
        const CheckEnsorAddress = async () => {
          try {
            if (correctNetwork || currentAddress) {
         
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const _ens=await provider.lookupAddress(currentAddress)
              console.log(_ens)
              if (_ens) {
                setEns(_ens);
              }
              else
              {
                setEns("Helo")
              }
            }
          }
          catch (err) {
            console.log(err);
          }

        }

        useEffect(() => {
          connectWallet();
        }, [])

        return (
          <div>
            <Head>
              <title>ENS Dapp</title>
              <meta name="description" content="ENS-Dapp" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.main}>
              <div>
                <h1 className={styles.title}>
                  Welcome to Web3 Punks  {ens ? ens : currentAddress}
                </h1>
                <div className={styles.description}>
                
                  Its an NFT collection for Web3 Punks.
                </div>
                <button onClick={CheckEnsorAddress} className={styles.button}>
       Ens Name
        </button>
              </div>
              <div>
                <img className={styles.image} src="./learnweb3punks.png" />
              </div>
            </div>

            <footer className={styles.footer}>
              Made with &#10084; by Hydra Richie
            </footer>
          </div>
        );
      }
