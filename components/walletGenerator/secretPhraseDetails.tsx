"use client";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Copy, Check, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SecretPhraseDetailsProps {
  mnemonicWords: string[];
}

const SecretPhraseDetails = ({ mnemonicWords }: SecretPhraseDetailsProps) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    const mnemonicPhrase = mnemonicWords.join(" ");
    navigator.clipboard.writeText(mnemonicPhrase);
    setCopied(true);
    toast.success("Mnemonic phrase copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-elevated">
          <h2
            className="text-xl font-bold cursor-pointer"
            onClick={toggleVisibility}
          >
            Your Secret Recovery Phrase
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={!isVisible}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              onClick={toggleVisibility}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              {isVisible ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show
                </>
              )}
            </Button>
          </div>
        </div>

        {isVisible && (
          <div className="p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mnemonicWords.map((word, index) => (
                <Card
                  key={index}
                  variant="ghost"
                  className="flex items-center gap-2 p-3 hover:border-primary hover:bg-card transition-all cursor-default"
                >
                  <span className="text-xs font-semibold text-muted-foreground min-w-6">
                    {index + 1}.
                  </span>
                  <span className="font-mono font-medium">{word}</span>
                </Card>
              ))}
            </div>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> Never share your recovery phrase with
                anyone. Store it securely offline.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SecretPhraseDetails;
