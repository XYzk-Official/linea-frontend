import masterchefABI from 'config/abi/masterchef.json'
import BigNumber from 'bignumber.js'
import { xyzkMulticallv2 } from 'config/fn'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { getXYzKMasterChefV3Address } from '../../utils/addressHelpers'

export const fetchMasterChefV3FarmPoolLength = async (chainId: number) => {
  try {
    const [poolLength] = await xyzkMulticallv2({
      abi: masterchefABI,
      calls: [
        {
          name: 'poolLength',
          address: getXYzKMasterChefV3Address(chainId),
        },
      ],
      chainId,
    })

    return new BigNumber(poolLength).toNumber()
  } catch (error) {
    console.error('Fetch MasterChef Farm Pool Length Error: ', error)
    return BIG_ZERO.toNumber()
  }
}
