import Navbar from "@/components/Navbar";
import WalletGeneration from "@/components/WalletGeneration";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-4 min-h-[92vh] max-w-7xl mx-auto">
      <Navbar />
      <WalletGeneration />
    </main>
  );
}
