import RbtcLogo from 'src/config/assets/token_rbtc.png'
import {
  EnvironmentSettings,
  ETHEREUM_LAYER,
  ETHEREUM_NETWORK,
  SHORT_NAME,
  NetworkConfig,
} from 'src/config/networks/network.d'
import { WALLETS } from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  clientGatewayUrl: 'http://ec2-3-69-52-53.eu-central-1.compute.amazonaws.com/v1',
  txServiceUrl: 'https://safe-tx.ngrok.io/api/v1',
  gasPrice: 65000000,
  safeAppsRpcServiceUrl: 'https://public-node.testnet.rsk.co',
  rpcServiceUrl: 'https://public-node.testnet.rsk.co',
  networkExplorerName: 'tRSK Explorer',
  networkExplorerUrl: 'https://explorer.testnet.rsk.co',
  networkExplorerApiUrl: 'https://explorer.testnet.rsk.co',
}

const rsk_testnet: NetworkConfig = {
  environment: {
    test: baseConfig,
    dev: baseConfig,
    staging: baseConfig,
    production: {
      ...baseConfig,
      clientGatewayUrl: 'http://ec2-3-69-52-53.eu-central-1.compute.amazonaws.com/v1',
      txServiceUrl: 'https://safe-tx.ngrok.io/api/v1',
    },
  },
  network: {
    id: ETHEREUM_NETWORK.RSK_TESTNET,
    shortName: SHORT_NAME.RSK_TESTNET,
    backgroundColor: '#ffaea3',
    textColor: '#001428',
    label: 'RSK Testnet',
    ethereumLayer: ETHEREUM_LAYER.L2,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'tRBTC',
      symbol: 'tRBTC',
      decimals: 18,
      logoUri: RbtcLogo,
    },
  },
  disabledWallets: [WALLETS.LATTICE],
}

export default rsk_testnet
