import { http, createConfig } from "wagmi";
import { base, mainnet } from "wagmi/chains";
// import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";

export const config = createConfig({
  chains: [base, mainnet],
  // connectors: [miniAppConnector()],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
