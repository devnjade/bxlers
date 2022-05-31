import React from "react";
import styles from './index.module.scss';
import {
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useNetwork,
  useSigner,
} from 'wagmi';
import abi from 'web3/abi/BxlersNFT.json';
import { ethers } from "ethers";

const App: React.FC = () => {
  const { data: account } = useAccount();
  const { connect, connectors, error, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: signer } = useSigner();
  const { activeChain, switchNetwork } = useNetwork();

  const address = account?.address;
  const first = address?.substring(0, 5);
  const last = address?.substring(address.length - 5);
  const ethAddress = first + '...' + last;

  let walletActiveChainId = activeChain?.id;

  let contractAddress: any = process.env.REACT_APP_CONTRACT_ADDRESS;

  let ethPrice = 0.1;

  const [counter, setCounter] = React.useState(1);
  const [price, setPrice] = React.useState(ethPrice);
  const [wrongNetwork, setWrongNetwork] = React.useState(false);

  const connectWallet = () => {
    connect(connectors[0])
  };

  const disWallet = () => {
    disconnect();
  };

  React.useEffect(() => {
    if (error) {
      console.log(error)
    }
    if (isConnecting) {
      console.log('connecting')
    }
    if (counter === 0 || NaN) {
      setCounter(1)
    }
    if (counter > 4) {
      setCounter(4)
    }
    if (counter >= 2){
      setPrice(ethPrice * counter)
    }
    if (counter === 1){
      setPrice(ethPrice)
    }
    if (walletActiveChainId === 3) {
      setWrongNetwork(false);
    } else {
      setWrongNetwork(true);
    }
  }, [error, isConnecting, counter, ethPrice, walletActiveChainId]);

  const increment = () => {
    setCounter(counter + 1);
  }

  const decrement = () => {
    setCounter(counter - 1);
  }

  const contract = useContract(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
      signerOrProvider: signer,
    },
  )

  const Mint = async () => {
    // const res = await contract;
    const tx = await contract.mint(counter, {
      value: ethers.utils.parseEther((0.1 * counter).toFixed(1).toString()),
    });
    const receipt = await tx;
    console.log(receipt)
  }

  const switchUserNetwork = async () => {
    if (wrongNetwork === true) {
      switchNetwork!(3);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.header}>Bxlers NFT</p>
        {!account && 
          <button 
            onClick={connectWallet} 
            className={styles.connectWallet}
          >
            Connect Wallet
          </button>}
        {account && 
          <div className={styles.mint}>
            <div className={styles.top}>
              <div className={styles.left}>
                <p>{ethAddress}</p>
                {wrongNetwork 
                  ? 
                    <p className={styles.wrong}>wrong network</p> 
                  : 
                    <p>connected</p>
                }
              </div>
              {wrongNetwork 
                ? 
                  <button 
                    className={styles.disWallet} 
                    onClick={switchUserNetwork}
                  >
                    Switch Network
                  </button>
                : 
                  <button 
                    className={styles.disWallet} 
                    onClick={disWallet}
                  >
                    Disconnect Wallet
                  </button>
              }
            </div>
            <div className={styles.mintWrapper}>
              <div className={styles.counter}>
                <button onClick={decrement}>-</button>
                <input 
                  min={1}
                  value={counter}
                  onChange={(e) => setCounter(parseInt(e.target.value))}
                  disabled
                />
                <button onClick={increment}>+</button>
              </div>
              <button  onClick={() => Mint()}>Mint {price.toFixed(1)}</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default App;