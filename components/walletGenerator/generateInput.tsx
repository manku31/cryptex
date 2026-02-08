// "use client";

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { derivePath } from "ed25519-hd-key";
import { toast } from "sonner";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import WalletDetails from "./walletDetails";
import SecretPhraseDetails from "./secretPhraseDetails";

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

const GenerateInput = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([
    ...Array(12).fill(""),
  ]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<boolean[]>([]);

  const handleGenerateWallet = () => {
    try {
      // Generate a random mnemonic and populate state.
      const mnemonic = generateMnemonic(
        mnemonicWords.length === 12 ? 128 : 256,
      );
      const words = mnemonic.split(" ");
      setMnemonicWords(words);

      // Generate wallet from mnemonic
      const wallet = generateWalletFromMnemonic(
        `501`, // Solana derivation paths use 501 as the coin type
        mnemonic,
        wallets.length,
      );

      if (wallet) {
        const updatedWallets = [...wallets, wallet];
        setWallets(updatedWallets);
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
        localStorage.setItem("mnemonics", JSON.stringify(words));
        // localStorage.setItem("paths", JSON.stringify(pathTypes));
        setVisiblePrivateKeys([...visiblePrivateKeys, false]);
        setVisiblePhrases([...visiblePhrases, false]);
        toast.success("Wallet generated successfully!");
      }
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  const generateWalletFromMnemonic = (
    pathType: string,
    mnemonic: string,
    accountIndex: number,
  ) => {
    try {
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
      console.log({ seedBuffer, path });

      const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));

      let publicKeyEncoded: string;
      let privateKeyEncoded: string;

      if (pathType === "501") {
        const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keypair = Keypair.fromSecretKey(secretKey);

        privateKeyEncoded = bs58.encode(secretKey);
        publicKeyEncoded = keypair.publicKey.toBase58();
      } else {
        toast.error("Unsupported path type.");
        return null;
      }

      return {
        publicKey: publicKeyEncoded,
        privateKey: privateKeyEncoded,
        mnemonic,
        path,
      };
    } catch (error) {
      console.error("Error generating wallet from mnemonic:", error);
    }
  };

  const handleAddWallet = () => {
    try {
      if (!mnemonicWords) {
        toast.error("No mnemonic found. Please generate a wallet first.");
        return;
      }

      const wallet = generateWalletFromMnemonic(
        "501",
        mnemonicWords.join(" "),
        wallets.length,
      );

      if (wallet) {
        const updatedWallets = [...wallets, wallet];
        setWallets(updatedWallets);
        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
        setVisiblePrivateKeys([...visiblePrivateKeys, false]);
        setVisiblePhrases([...visiblePhrases, false]);
        toast.success("Wallet generated successfully!");
      }
    } catch (error) {
      toast.error("Error adding wallet. Please try again.");
      console.error("Error adding wallet : ", error);
    }
  };

  const handleClearWallets = () => {
    setWallets([]);
    setMnemonicWords([...Array(12).fill("")]);
    localStorage.removeItem("wallets");
    localStorage.removeItem("mnemonics");
    setVisiblePrivateKeys([]);
    setVisiblePhrases([]);
    toast.success("All wallets cleared successfully!");
  };

  const handleDeleteWallet = (index: number) => {
    const updatedWallets = wallets.filter((_, i) => i !== index);
    // const updatedPathTypes = pathTypes.filter((_, i) => i !== index);

    setWallets(updatedWallets);
    localStorage.setItem("wallets", JSON.stringify(updatedWallets));
    setVisiblePrivateKeys(visiblePrivateKeys.filter((_, i) => i !== index));
    setVisiblePhrases(visiblePhrases.filter((_, i) => i !== index));
    toast.success("Wallet deleted successfully!");
  };

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    const storedMnemonics = localStorage.getItem("mnemonics");

    if (storedWallets && storedMnemonics) {
      setWallets(JSON.parse(storedWallets));
      setMnemonicWords(JSON.parse(storedMnemonics));
      setVisiblePrivateKeys(JSON.parse(storedWallets).map(() => false));
      setVisiblePhrases(JSON.parse(storedWallets).map(() => false));
    }
  }, []);

  return (
    <div className="flex flex-col w-full justify-center gap-6">
      {wallets.length === 0 && (
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="secret-phrase" className="text-sm font-medium">
              Enter existing recovery phrase (optional)
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Input
                id="secret-phrase"
                placeholder="Enter your secret recovery phrase"
                className="flex-1"
              />
              <Button
                onClick={handleGenerateWallet}
                size="lg"
                className="w-full md:w-auto"
              >
                Generate Wallet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Display Secret Phrase */}
      {mnemonicWords && wallets.length > 0 && (
        <SecretPhraseDetails mnemonicWords={mnemonicWords} />
      )}

      {wallets.length > 0 && (
        <WalletDetails
          wallets={wallets}
          handleAddWallet={handleAddWallet}
          handleClearWallets={handleClearWallets}
          handleDeleteWallet={handleDeleteWallet}
        />
      )}
    </div>
  );
};

export default GenerateInput;
