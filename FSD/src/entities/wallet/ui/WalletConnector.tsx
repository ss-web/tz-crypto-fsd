// src/features/wallet/ui/WalletConnector.tsx
import React, { useState } from 'react';
import { walletModel } from '@/entities/wallet/model/wallet';
import { PublicKey } from '@solana/web3.js';
import ConnectWalletButton from './ConnectWalletButton';
import SendSolForm from './SendSolForm';

const WalletConnector: React.FC = () => {
	const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);
	const [balance, setBalance] = useState<number | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const connectWallet = () => {
		walletModel.connectWallet(setWalletAddress, setMessage);
	};

	const fetchBalance = () => {
		if (walletAddress) {
			walletModel.fetchBalance(walletAddress, setBalance, setMessage);
		} else {
			setMessage("Please connect your wallet first.");
		}
	};

	const handleSendSol = async (toPublicKey: PublicKey, amount: number) => {
		if (walletAddress) {
			await walletModel.sendSol(walletAddress, toPublicKey, amount, setMessage);
		} else {
			setMessage("Please connect your wallet first.");
		}
	};

	return (
		<div>
			<ConnectWalletButton onConnect={connectWallet} />
			{walletAddress && (
				<div>
					<p>Wallet: {walletAddress.toString()}</p>
					<button onClick={fetchBalance}>Get Balance</button>
					{balance !== null && <p>Balance: {balance} SOL</p>}
					<SendSolForm onSendSol={handleSendSol} />
					{message && <p>{message}</p>}
				</div>
			)}
		</div>
	);
};

export default WalletConnector;
