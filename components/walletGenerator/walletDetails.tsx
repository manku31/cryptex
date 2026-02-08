"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Trash2, Key, Lock, Copy, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

interface WalletDetailsProps {
  wallets: Wallet[];
  handleAddWallet: () => void;
  handleClearWallets: () => void;
  handleDeleteWallet: (index: number) => void;
}

const WalletDetails = ({
  wallets,
  handleAddWallet,
  handleClearWallets,
  handleDeleteWallet,
}: WalletDetailsProps) => {
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>(
    wallets.map(() => false),
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const togglePrivateKeyVisibility = (index: number) => {
    const newVisibility = [...visiblePrivateKeys];
    newVisibility[index] = !newVisibility[index];
    setVisiblePrivateKeys(newVisibility);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Solana Wallets</h2>
        <div className="flex gap-4">
          <Button onClick={() => handleAddWallet()}>Add Wallet</Button>
          <Button variant="destructive" onClick={() => handleClearWallets()}>
            Clear Wallets
          </Button>
        </div>
      </div>
      {wallets.map((wallet, index) => (
        <Card key={index} variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Wallet {index + 1}</CardTitle>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Wallet {index + 1}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your wallet and remove all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteWallet(index)}
                      className="bg-destructive text-white hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wallet Keys Container */}
            <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-primary/10">
                  <Key className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Public Key
                  </label>
                  <div className="flex gap-2 items-start">
                    <code className="flex-1 p-3 bg-background border border-border rounded-md text-xs break-all font-mono">
                      {wallet.publicKey}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() =>
                        copyToClipboard(wallet.publicKey, "Public Key")
                      }
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-destructive/10">
                  <Lock className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Private Key
                    <span className="text-xs font-normal text-destructive">
                      (Keep Secret)
                    </span>
                  </label>
                  <div className="flex gap-2 items-start">
                    <code className="flex-1 p-3 bg-background border border-border rounded-md text-xs break-all font-mono">
                      {visiblePrivateKeys[index]
                        ? wallet.privateKey
                        : "•".repeat(64)}
                    </code>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePrivateKeyVisibility(index)}
                      >
                        {visiblePrivateKeys[index] ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(wallet.privateKey, "Private Key")
                        }
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WalletDetails;
