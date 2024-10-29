import { StrictMode, FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import { WalletProvider } from '@/app/providers/WalletProvider';
import WalletConnector from '@/entities/wallet/ui/WalletConnector';

import './styles/index.css';

const App: FC = () => (
	<WalletProvider>
		<h1>Solana Wallet App</h1>
		<WalletConnector />
	</WalletProvider>
);

window.Buffer = Buffer;
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)

