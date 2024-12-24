import {
  DynamicHandlers,
  DynamicEventsCallbacks,
} from "@dynamic-labs/sdk-react-core";
import { ReactNode } from "react";
import { Chain } from "viem";

export interface WalletSettings {
  environmentId: string;
  events?: DynamicEventsCallbacks;
  handlers?: DynamicHandlers;
}

export interface WalletProps {
  children: ReactNode;
  chains?: [Chain, ...Chain[]];
  cookie?: string;
  dynamicSettings: WalletSettings;
}
