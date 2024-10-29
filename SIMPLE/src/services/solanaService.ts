import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');

// Функция для получения баланса
export const getBalance = async (publicKey: PublicKey) => {
	try {
		const balance = await connection.getBalance(publicKey);
		return balance / LAMPORTS_PER_SOL;
	} catch (error) {
		console.error("Error fetching balance:", error);
		throw error;
	}
};

// Функция для отправки SOL
export const sendSol = async (fromPublicKey: PublicKey, toAddress: string, amount: number, signTransaction: any) => {
	try {
		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: fromPublicKey,
				toPubkey: new PublicKey(toAddress),
				lamports: amount * LAMPORTS_PER_SOL,
			})
		);

		// Получаем latestBlockhash и устанавливаем его в транзакцию
		const { blockhash } = await connection.getLatestBlockhash();
		transaction.recentBlockhash = blockhash;
		transaction.feePayer = fromPublicKey; // Кто будет платить коммисию

		// Подписываем транзакцию
		const signedTransaction = await signTransaction(transaction);
		const txId = await connection.sendRawTransaction(signedTransaction.serialize());
		await connection.confirmTransaction(txId);
		return txId;
	} catch (error) {
		console.error("Error sending SOL:", error);
		throw error;
	}
};
