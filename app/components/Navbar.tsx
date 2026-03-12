"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = () => {

    if (typeof window === "undefined") return;

    const isMobile =
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const hasMetaMask =
      typeof (window as any).ethereum !== "undefined";

    // If MetaMask exists → connect normally
    if (hasMetaMask) {
      connect({ connector: injected() });
      return;
    }

    // If mobile browser → try open MetaMask app
    if (isMobile) {

      const dappUrl = window.location.href.replace(
        /^https?:\/\//,
        ""
      );

      const metamaskLink =
        `https://metamask.app.link/dapp/${dappUrl}`;

      window.location.href = metamaskLink;

      // fallback to store
      setTimeout(() => {

        const isIOS =
          /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isIOS) {
          window.location.href =
            "https://apps.apple.com/app/metamask/id1438144202";
        } else {
          window.location.href =
            "https://play.google.com/store/apps/details?id=io.metamask";
        }

      }, 2000);

      return;
    }

    // Desktop without MetaMask
    window.location.href =
      "https://metamask.io/download/";
  };

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Social<span className="text-purple-400">Edger</span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-10 text-[18px] font-space text-gray-300">

          <Link href="/membership" className="hover:text-white transition">
            Membership
          </Link>

          <Link href="/reputation" className="hover:text-white transition">
            Reputation
          </Link>

          <Link href="/gallery" className="hover:text-white transition">
            NFTs
          </Link>

          <Link href="/contributors" className="hover:text-white transition">
            Contributors
          </Link>

          <Link href="/presale" className="hover:text-white transition">
            Presale
          </Link>

          <Link href="/docs" className="hover:text-white transition">
            Docs
          </Link>

          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>

        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">

          {!isConnected ? (

            <button
              onClick={connectWallet}
              className="btn-primary"
            >
              Connect Wallet
            </button>

          ) : (

            <>
              <Link
                href="/dashboard"
                className="btn-outline"
              >
                Dashboard
              </Link>

              <button
                onClick={() => disconnect()}
                className="btn-primary"
              >
                Disconnect
              </button>
            </>

          )}

        </div>

        {/* MOBILE ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-6 bg-black/80 backdrop-blur-xl text-[18px] font-space text-gray-300 border-t border-white/10">

          <Link href="/membership" onClick={() => setOpen(false)}>
            Membership
          </Link>

          <Link href="/reputation" onClick={() => setOpen(false)}>
            Reputation
          </Link>

          <Link href="/gallery" onClick={() => setOpen(false)}>
            NFTs
          </Link>

          <Link href="/contributors" onClick={() => setOpen(false)}>
            Contributors
          </Link>

          <Link href="/presale" onClick={() => setOpen(false)}>
            Presale
          </Link>

          <Link href="/docs" onClick={() => setOpen(false)}>
            Docs
          </Link>

          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <div className="flex flex-col gap-3 pt-4">

            {!isConnected ? (

              <button
                onClick={connectWallet}
                className="btn-primary"
              >
                Connect Wallet
              </button>

            ) : (

              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="btn-outline text-center"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => disconnect()}
                  className="btn-primary"
                >
                  Disconnect
                </button>
              </>

            )}

          </div>

        </nav>
      </div>

    </header>
  );
}
