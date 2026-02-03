import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";

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
        <Navbar />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
