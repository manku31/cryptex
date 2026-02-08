import Navbar from "@/components/navbar/Navbar";
import WalletGenerator from "@/components/walletGenerator/WalletGenerator";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 px-4 py-8 md:px-6 md:py-12 max-w-7xl mx-auto w-full">
        <WalletGenerator />
      </main>
    </>
  );
}
