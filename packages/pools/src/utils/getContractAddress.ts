import { ChainId } from '@pancakeswap/sdk'

import { ContractAddresses } from '../constants/contracts'
import { isPoolsSupported } from './isPoolsSupported'
import { SupportedChainId } from '../constants'

export function getContractAddress(addresses: ContractAddresses, chainId: ChainId) {
  if (!isPoolsSupported(chainId)) {
    throw new Error(`Cannot get contract address. Unsupported chain ${chainId}`)
  }
  return addresses[chainId]
}

export function getXYzKContractAddress(addresses: ContractAddresses, chainId: SupportedChainId) {
  if (!isPoolsSupported(chainId)) {
    throw new Error(`Cannot get contract address. Unsupported chain ${chainId}`)
  }
  return addresses[chainId]
}
