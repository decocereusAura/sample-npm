import Web3Provider, {
  WalletProviderSettings,
} from "@/src/provider/web3-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dynamicSettings: WalletProviderSettings = {
    environmentId: "",
  };
  const cookie = (await headers()).get("cookie");
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider
          dynamicSettings={dynamicSettings}
          cookie={cookie ?? undefined}
        >
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
