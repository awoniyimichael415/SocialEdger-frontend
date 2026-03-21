import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";
import { Web3Provider } from "@/src/lib/wagmi-provider";
import KYCGate from "./components/KYCGate";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = {
  title: "SocialEdger",
  description: "Where Reputation Meets Opportunity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-[#070816] text-white font-sans">
        {/* 🔗 Web3 Provider (REQUIRED for Wagmi hooks in dashboard & vaults) */}
        <Web3Provider>
          <Navbar />
          <KYCGate />
          <div className="pt-20">{children}</div>
        </Web3Provider>
      </body>
    </html>
  );
}
