// src/features/wallet/ui/SendSolForm.tsx
import React, { useState } from 'react';
import { PublicKey } from '@solana/web3.js';

interface Props {
	// walletAddress: PublicKey;
	onSendSol: (toPublicKey: PublicKey, amount: number) => Promise<void>;
}

const SendSolForm: React.FC<Props> = ({ onSendSol }) => {
	const [receiveWallet, setReceiveWallet] = useState<string>('');
	const [receiveAmount, setReceiveAmount] = useState<number>(0.001);
	const [message, setMessage] = useState<string | null>(null);

	const handleSend = async () => {
		try {
			const toPublicKey = new PublicKey(receiveWallet);
			await onSendSol(toPublicKey, receiveAmount);
		} catch (error) {
			console.error("Error sending SOL:", error);
			setMessage("Failed to send SOL.");
		}
	};

	return (
		<div className="send-form">
			<input
				type="text"
				placeholder="Enter recipient address"
				value={receiveWallet}
				onChange={(e) => setReceiveWallet(e.target.value)}
				required
			/>
			<input
				type="number"
				min="0.001"
				step="0.001"
				placeholder="Amount in SOL"
				value={receiveAmount}
				onChange={(e) => setReceiveAmount(parseFloat(e.target.value))}
				required
			/>
			<button onClick={handleSend}>Send SOL</button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default SendSolForm;
