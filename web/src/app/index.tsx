import React from "react";
import styles from './index.module.scss';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

const App: React.FC = () => {
  const { connect, connectors, error, isConnecting, pendingConnector } = useConnect();
  console.log(connectors)

  const connectWallet = () => {
    connect(connectors[0])
  };

  React.useEffect(() => {
    if (error) {
      console.log(error)
    }
    if (isConnecting) {
      console.log('connecting')
    }
  }, [error, isConnecting])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.header}>Bxlers NFT</p>
        <button className={styles.connectWallet}>Connect Wallet</button>
      </div>
    </div>
  )
}

export default App;