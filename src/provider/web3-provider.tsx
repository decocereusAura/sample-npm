"use client";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  DynamicContextProvider,
  DynamicEventsCallbacks,
  DynamicHandlers,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { Chain, EIP1193RequestFn, http } from "viem";
import { mainnet, sophon, sophonTestnet } from "viem/chains";
import {
  cookieStorage,
  cookieToInitialState,
  createConfig,
  createStorage,
  Transport,
  WagmiProvider,
} from "wagmi";

export type WalletProviderSettings = {
  environmentId: string;
  events?: DynamicEventsCallbacks;
  handlers?: DynamicHandlers;
};

export interface CustomWeb3ProviderProps {
  children: ReactNode;
  chains?: [Chain, ...Chain[]];
  cookie?: string;
  dynamicSettings: WalletProviderSettings;
}

export default function Web3WalletProvider({
  children,
  chains = [mainnet, sophon, sophonTestnet],
  cookie,
  dynamicSettings,
}: Readonly<CustomWeb3ProviderProps>) {
  const queryClient = new QueryClient();
  const wagmiTransports = () => {
    return chains.reduce((acc, chain) => {
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
}
