import { useMemo } from 'react'
import { newProvider } from 'config/chains'
import { ChainId } from '@pancakeswap/sdk'
import { useAccount, useProvider, useSigner } from '@xyzk/wagmi'
import { useActiveChainId } from './useActiveChainId'

export const useProviderOrSigner = (withSignerIfPossible = true, forceBSC?: boolean) => {
  const { chainId } = useActiveChainId()
  const provider = useProvider({ chainId: forceBSC ? ChainId.BSC : chainId })
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}

export const useXYzKProviderOrSigner = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const provider = newProvider[chainId]
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()

  return useMemo(
    () => (withSignerIfPossible && address && isConnected && signer ? signer : provider),
    [address, isConnected, provider, signer, withSignerIfPossible],
  )
}
