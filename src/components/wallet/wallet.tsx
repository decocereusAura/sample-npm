"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { createStorage, cookieToInitialState } from "@wagmi/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { EIP1193RequestFn, http, Transport } from "viem";
import { cookieStorage, createConfig, WagmiProvider } from "wagmi";
import { mainnet, sophon, sophonTestnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WalletProps } from "./types";

const queryClient = new QueryClient();

const Wallet = ({
  children,
  chains = [mainnet, sophon, sophonTestnet],
  cookie,
  dynamicSettings,
}: WalletProps) => {
  const wagmiTransports = () => {
    return chains?.reduce((acc, chain) => {
      acc[chain.id] = http();
      return acc;
    }, {} as Record<number, Transport<string, Record<string, unknown>, EIP1193RequestFn>>);
  };
  const config = createConfig({
    chains,
    syncConnectedChain: true,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    multiInjectedProviderDiscovery: false,
    transports: {
      ...wagmiTransports(),
    },
  });
  const initialState = cookieToInitialState(config, cookie);
  return (
    <DynamicContextProvider
      settings={{
        environmentId: dynamicSettings.environmentId,
        walletConnectors: [EthereumWalletConnectors],
        events: { ...dynamicSettings?.events },
        handlers: { ...dynamicSettings?.handlers },
      }}
    >
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};

export default Wallet;
