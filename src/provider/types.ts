import {
  DynamicHandlers,
  DynamicEventsCallbacks,
} from "@dynamic-labs/sdk-react-core";
import { ReactNode } from "react";
import { Chain } from "viem";

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
