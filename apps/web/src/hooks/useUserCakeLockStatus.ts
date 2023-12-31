import { useAccount } from '@xyzk/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import useSWRImmutable from 'swr/immutable'
import { useCakeVaultContract } from 'hooks/useContract'
import { useActiveChainId } from './useActiveChainId'

export const useUserCakeLockStatus = () => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()
  const cakeVaultContract = useCakeVaultContract(false)

  const { data: userCakeLockStatus = null } = useSWRImmutable(
    account && chainId === ChainId.BSC ? ['userCakeLockStatus', account] : null,
    async () => {
      const { locked, lockEndTime } = await cakeVaultContract.userInfo(account)
      const lockEndTimeStr = lockEndTime.toString()
      return locked && (lockEndTimeStr === '0' || Date.now() > parseInt(lockEndTimeStr) * 1000)
    },
  )
  return userCakeLockStatus
}
