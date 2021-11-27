import EtherLogo from 'src/config/assets/token_eth.svg'
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
  txServiceUrl: 'http://localhost:8888/api/v1',
  gasPrice: 0.06,
  safeAppsRpcServiceUrl: 'https://public-node.rsk.co',
  rpcServiceUrl: 'https://public-node.rsk.co',
  networkExplorerName: 'RSK Explorer',
  networkExplorerUrl: 'https://explorer.rsk.co',
  networkExplorerApiUrl: 'https://explorer.rsk.co',
}

const rsk: NetworkConfig = {
  environment: {
    test: baseConfig,
    dev: baseConfig,
    staging: baseConfig,
    production: {
      ...baseConfig,
      clientGatewayUrl: 'http://ec2-3-69-52-53.eu-central-1.compute.amazonaws.com/v1',
      txServiceUrl: 'http://localhost:8888/api/v1',
    },
  },
  network: {
    id: ETHEREUM_NETWORK.RSK,
    shortName: SHORT_NAME.RSK,
    backgroundColor: '#E8E7E6',
    textColor: '#001428',
    label: 'RSK',
    ethereumLayer: ETHEREUM_LAYER.L2,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'RBTC',
      symbol: 'RBTC',
      decimals: 18,
      logoUri: EtherLogo,
    },
  },
  disabledWallets: [WALLETS.LATTICE],
}

export default rsk
