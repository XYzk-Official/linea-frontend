import { ChainId } from '@pancakeswap/sdk'

import { CAKE_FLEXIBLE_SIDE_VAULT, CAKE_VAULT } from '../constants/contracts'
import { getContractAddress, getXYzKContractAddress } from '../utils'
import { SupportedChainId } from '../constants'

export function getCakeFlexibleSideVaultAddress(chainId: ChainId) {
  return getContractAddress(CAKE_FLEXIBLE_SIDE_VAULT, chainId)
}

export function getCakeVaultAddress(chainId: SupportedChainId) {
  return getXYzKContractAddress(CAKE_VAULT, chainId)
}
