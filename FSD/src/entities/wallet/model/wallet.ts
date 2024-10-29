// src/entities/wallet/model/wallet.ts
import { PublicKey } from '@solana/web3.js';
import { getBalance, sendSol } from '@/shared/api/solanaService';

interface WalletState {
	walletAddress: PublicKey | null;
	balance: number | null;
}

export const walletModel = {
	state: {
		walletAddress: null,
		balance: null,
	} as WalletState,

	async connectWallet(setWalletAddress: (address: PublicKey | null) => void, setMessage: (msg: string) => void) {
		if (window.solana && window.solana.isPhantom) {
			try {
				const response = await window.solana.connect();
				const walletAddress = new PublicKey(response.publicKey.toString());
				setWalletAddress(walletAddress);
				setMessage("Wallet connected!");
				walletModel.state.walletAddress = walletAddress;
			} catch (error) {
				console.error("Connection error:", error);
				setMessage("Failed to connect wallet.");
			}
		} else {
			alert("Phantom Wallet not installed!");
		}
	},

	async fetchBalance(walletAddress: PublicKey, setBalance: (balance: number) => void, setMessage: (msg: string) => void) {
		try {
			const balance = await getBalance(walletAddress);
			setBalance(balance);
			setMessage("Balance retrieved!");
			walletModel.state.balance = balance;
		} catch (error) {
			console.error("Error fetching balance:", error);
			setMessage("Failed to fetch balance.");
		}
	},

	async sendSol(
		walletAddress: PublicKey,
		toPublicKey: PublicKey,
		amount: number,
		setMessage: (msg: string) => void
	) {
		try {
			const provider = window.solana;
			if (provider && amount > 0) {
				const txId = await sendSol(walletAddress, toPublicKey.toString(), amount, provider.signTransaction);
				setMessage(`Transaction successful! ID: ${txId}`);
			} else {
				setMessage("Enter a valid address and amount.");
			}
		} catch (error) {
			console.error("Error sending SOL:", error);
			setMessage("Failed to send SOL.");
		}
	},
};
