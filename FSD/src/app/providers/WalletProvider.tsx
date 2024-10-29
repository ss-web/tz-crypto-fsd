import React, { createContext, useContext, useState } from 'react';
import { PublicKey } from '@solana/web3.js';

interface WalletContextType {
	walletAddress: PublicKey | null;
	setWalletAddress: (address: PublicKey | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);

	return (
		<WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
			{children}
		</WalletContext.Provider>
	);
};

export const useWallet = () => {
	const context = useContext(WalletContext);
	if (!context) {
		throw new Error('useWallet must be used within a WalletProvider');
	}
	return context;
};
