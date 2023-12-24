import { ChainId } from '@pancakeswap/sdk'
import { linea, lineaTestnet } from '@xyzk/wagmi-chains'

export const SUPPORT_ONLY_BSC = [ChainId.BSC, 4002, linea.id, lineaTestnet.id]
export const SUPPORT_FARMS = [
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.ETHEREUM,
  ChainId.GOERLI,
  linea.id,
  lineaTestnet.id,
]
