import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { defineChain } from "viem";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";

const studionet = defineChain({
  id: 61999,
  name: "GenLayer Studionet",
  nativeCurrency: { name: "GEN", symbol: "GEN", decimals: 18 },
  rpcUrls: { default: { http: ["https://studio.genlayer.com/api"] }, public: { http: ["https://studio.genlayer.com/api"] } },
  blockExplorers: { default: { name: "GenLayer Studio Explorer", url: "https://explorer-studio.genlayer.com" } },
  testnet: true,
});

const config = createConfig({
  chains: [studionet],
  connectors: [injected({ shimDisconnect: true })],
  transports: { [studionet.id]: http("https://studio.genlayer.com/api") },
});

const queryClient = new QueryClient();

function WalletEntry() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#171515",
            accentColorForeground: "#f5efe1",
            borderRadius: "small",
            fontStack: "system",
          })}
        >
          <ConnectButton.Custom>
            {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
              const connected = mounted && account && chain;
              if (!connected) return <button className="rainbowWallet" onClick={openConnectModal} type="button">Connect wallet</button>;
              if (chain.unsupported) return <button className="rainbowWalletWarn" onClick={openChainModal} type="button">Switch network</button>;
              return (
                <div className="rainbowStack">
                  <button className="rainbowChain" onClick={openChainModal} type="button">{chain.name}</button>
                  <button className="rainbowAccount" onClick={openAccountModal} type="button">{account.displayName}</button>
                </div>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const mount = document.getElementById("wallet-root");
if (mount) createRoot(mount).render(<WalletEntry />);
