import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'assets/styles/index.scss';
import { WagmiConfig, createClient } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector(),
  ]
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
