// src/components/WalletConnector.tsx
import React, { useState } from 'react';
import { getBalance, sendSol } from '../services/solanaService';
import { PublicKey } from '@solana/web3.js';

const WalletConnector: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<PublicKey | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [receiveWallet, setReceiveWallet] = useState<string>('');
  const [receive, setReceive] = useState<number>(0.001);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(new PublicKey(response.publicKey.toString()));
        setMessage("Кошелек подключен!");
      } catch (error) {
        console.error("Ошибка подключения:", error);
        setMessage("Ошибка подключения к кошельку.");
      }
    } else {
      alert("Phantom Wallet не установлен!");
    }
  };

  const fetchBalance = async () => {
    if (walletAddress) {
      try {
        const balance = await getBalance(walletAddress);
        setBalance(balance);
        setMessage("Баланс получен!");
      } catch (error) {
        console.error("Ошибка получения баланса:", error);
        setMessage("Ошибка получения баланса.");
      }
    } else {
      setMessage("Кошелек не подключен.");
    }
  };

  const handleSendSol = async () => {
    if (walletAddress) {
      try {
        const provider = window.solana;
        const toPublicKey = new PublicKey(receiveWallet);
        if (provider && receive > 0) {
          const txId = await sendSol(walletAddress, toPublicKey.toString(), receive, provider.signTransaction);
          setMessage(`Транзакция успешна! ID: ${txId}`);
        } else {
          setMessage("Введите правильный адрес и сумму для отправки.");
        }
      } catch (error) {
        console.error("Ошибка отправки SOL:", error);
        setMessage("Ошибка отправки SOL.");
      }
    } else {
      setMessage("Кошелек не подключен.");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Подключить кошелек</button>
      {walletAddress && (
        <div>
          <p>Кошелек: {walletAddress.toString()}</p>
          <button onClick={fetchBalance}>Получить баланс</button>
          {balance !== null && <p>Баланс: {balance} SOL</p>}
          <div className="send-form">
            <input
              type="text"
              placeholder="Введите адрес"
              value={receiveWallet}
              onChange={(e) => setReceiveWallet(e.target.value)}
              required
            />
            <input
              type="number"
              min="0.001"
              step="0.001"
              placeholder="Сумма SOL"
              value={receive}
              onChange={(e) => setReceive(parseFloat(e.target.value))}
              required
            />
            <button onClick={handleSendSol}>Отправить SOL</button>
          </div>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
