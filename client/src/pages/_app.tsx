import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import {localhost} from "wagmi/chains"
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


const {chains, provider, webSocketProvider} = configureChains(
  [localhost],
  [publicProvider()]
)

const client = createClient({
  autoConnect: false,
  provider,  
  webSocketProvider,
  connectors:[
    new InjectedConnector({
      chains,
      options:{
        name: 'Injected',
        shimDisconnect: true
      }
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ]  
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
        <Component {...pageProps} />
    </WagmiConfig>
  )
}
