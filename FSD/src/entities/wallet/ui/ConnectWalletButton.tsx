// src/features/wallet/ui/ConnectWalletButton.tsx
import React from 'react';

interface Props {
  onConnect: () => void;
}

const ConnectWalletButton: React.FC<Props> = ({ onConnect }) => (
  <button onClick={onConnect}>Connect Wallet</button>
);

export default ConnectWalletButton;
