import Navbar from "@/components/navbar/Navbar";
import WalletGenerator from "@/components/walletGenerator/WalletGenerator";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-4 min-h-[92vh] max-w-7xl mx-auto">
      <Navbar />
      <WalletGenerator />
    </main>
  );
}
