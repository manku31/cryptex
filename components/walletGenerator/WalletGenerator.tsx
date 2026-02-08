"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import GenerateInput from "./generateInput";
import { toast } from "sonner";

interface SolWalletProps {
  solWallet: boolean;
  setSolWallet: (value: boolean) => void;
}

const WalletGenerator = () => {
  const [solWallet, setSolWallet] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="tracking-tighter text-4xl md:text-5xl font-black">
            Welcome to Cryptex!
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Your Personal Web3 Wallet
          </p>
        </div>

        <div className="flex gap-4">
          {!solWallet ? (
            <SolWallet solWallet={solWallet} setSolWallet={setSolWallet} />
          ) : (
            <GenerateInput />
          )}
        </div>
      </div>
    </div>
  );
};

const SolWallet = ({ solWallet, setSolWallet }: SolWalletProps) => {
  const handleGenerateWallet = () => {
    setSolWallet(!solWallet);
    toast.success("Wallet selected. Please generate a wallet to continue.");
  };
  return <Button onClick={handleGenerateWallet} size="lg">Solana Wallet</Button>;
};

export default WalletGenerator;
