"use client";

import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

// Hardhat Localhost Chain Config
export const wagmiConfig = createConfig({
  chains: [localhost],
  connectors: [
    injected(), // MetaMask / Injected Wallet
  ],
  transports: {
    [localhost.id]: http("http://127.0.0.1:8545"),
  },
});
