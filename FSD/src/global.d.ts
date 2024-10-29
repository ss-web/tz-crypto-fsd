// src/global.d.ts
interface PhantomProvider {
	isPhantom: boolean;
	connect: () => Promise<{ publicKey: string }>;
	signTransaction: (transaction: any) => Promise<any>;
}

interface Window {
	solana?: PhantomProvider; // Опционально, если solana не всегда доступен
}
