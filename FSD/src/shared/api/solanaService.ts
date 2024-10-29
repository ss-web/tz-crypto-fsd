import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { solanaConnection } from '@/shared/config/solanaConfig';

export const getBalance = async (publicKey: PublicKey) => {
	const balance = await solanaConnection.getBalance(publicKey);
	return balance / LAMPORTS_PER_SOL;
};

export const sendSol = async (
	fromPublicKey: PublicKey, 
	toAddress: string, 
	amount: number, 
	signTransaction: any
) => {
	const transaction = new Transaction().add(
		SystemProgram.transfer({
			fromPubkey: fromPublicKey,
			toPubkey: new PublicKey(toAddress),
			lamports: amount * LAMPORTS_PER_SOL,
		})
	);
	const { blockhash } = await solanaConnection.getLatestBlockhash();
	transaction.recentBlockhash = blockhash;
	transaction.feePayer = fromPublicKey;
	const signedTransaction = await signTransaction(transaction);
	const txId = await solanaConnection.sendRawTransaction(signedTransaction.serialize());
	await solanaConnection.confirmTransaction(txId);
	return txId;
};
