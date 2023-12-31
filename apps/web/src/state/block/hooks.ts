import { FAST_INTERVAL, SLOW_INTERVAL } from 'config/constants'
// eslint-disable-next-line camelcase
import useSWR, { useSWRConfig, unstable_serialize } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { useProvider } from '@xyzk/wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'

const REFRESH_BLOCK_INTERVAL = 6000

export const usePollBlockNumber = () => {
  const { cache, mutate } = useSWRConfig()
  const { chainId } = useActiveChainId()
  const provider = useProvider({ chainId })

  const { data } = useSWR(
    chainId && ['blockNumberFetcher', chainId],
    async () => {
      const blockNumber = await provider.getBlockNumber()
      mutate(['blockNumber', chainId], blockNumber)
      if (!cache.get(unstable_serialize(['initialBlockNumber', chainId]))?.data) {
        mutate(['initialBlockNumber', chainId], blockNumber)
      }
      if (!cache.get(unstable_serialize(['initialBlockTimestamp', chainId]))?.data) {
        const block = await provider.getBlock(blockNumber)
        mutate(['initialBlockTimestamp', chainId], block.timestamp)
      }
      return blockNumber
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    },
  )

  useSWR(
    chainId && [FAST_INTERVAL, 'blockNumber', chainId],
    async () => {
      return data
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWR(
    chainId && [SLOW_INTERVAL, 'blockNumber', chainId],
    async () => {
      return data
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
}

export const useCurrentBlock = (): number => {
  const { chainId } = useActiveChainId()
  const { data: currentBlock = 0 } = useSWRImmutable(['blockNumber', chainId])
  return currentBlock
}

export const useChainCurrentBlock = (chainId: number): number => {
  const { chainId: activeChainId } = useActiveChainId()
  const provider = useProvider({ chainId })
  const { data: currentBlock = 0 } = useSWR(
    chainId ? (activeChainId === chainId ? ['blockNumber', chainId] : ['chainBlockNumber', chainId]) : null,
    activeChainId !== chainId
      ? async () => {
          const blockNumber = await provider.getBlockNumber()
          return blockNumber
        }
      : undefined,
    activeChainId !== chainId
      ? {
          refreshInterval: REFRESH_BLOCK_INTERVAL,
        }
      : undefined,
  )
  return currentBlock
}

export const useInitialBlock = (): number => {
  const { chainId } = useActiveChainId()
  const { data: initialBlock = 0 } = useSWRImmutable(['initialBlockNumber', chainId])
  return initialBlock
}

export const useInitialBlockTimestamp = (): number => {
  const { chainId } = useActiveChainId()
  const { data: initialBlockTimestamp = 0 } = useSWRImmutable(['initialBlockTimestamp', chainId])
  return initialBlockTimestamp
}
