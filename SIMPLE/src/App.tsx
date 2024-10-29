// src/App.tsx
import React from 'react';
import WalletConnector from './components/WalletConnector';

const App: React.FC = () => {
  return (
    <div>
      <h1>Solana Wallet App</h1>
      <WalletConnector />
    </div>
  );
};

export default App;