import { ChainId } from '@pancakeswap/sdk'
import {
  APP_CHAIN_ID,
  xyzkBunniesAddress,
  xyzkBunnyFactoryAddress,
  xyzkMasterChefV3Address,
  xyzkMulticallAddress,
  xyzkProfileAddress,
} from 'config/chains'
import { linea, lineaTestnet } from '@xyzk/wagmi-chains'
import addresses from 'config/constants/contracts'
import { VaultKey } from 'state/types'

export interface Addresses {
  [chainId: number]: `0x${string}`
}

export const getAddress = (address: Addresses, chainId?: number): `0x${string}` => {
  return address[chainId] ? address[chainId] : address[ChainId.BSC]
}

export const getMasterChefAddress = (chainId?: number) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMasterChefV1Address = () => {
  return getAddress(addresses.masterChefV1)
}
export const getMulticallAddress = (chainId?: number) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getXYzKProfileAddress = (chainId: number = APP_CHAIN_ID) => {
  return xyzkProfileAddress[chainId]
}
export const getXYzKMulticallAddress = (chainId: number = APP_CHAIN_ID) => {
  return xyzkMulticallAddress[chainId]
}
export const getXYzKBunniesAddress = (chainId: number = APP_CHAIN_ID) => {
  return xyzkBunniesAddress[chainId]
}
export const getPancakeBunniesAddress = () => {
  return getAddress(addresses.pancakeBunnies)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
// export const getBeraBunnyFactoryAddress = (chainId: number = ftmTest.chainId) => {
//  return beraBunnyFactoryAddress[chainId]
// }
export const getXYzKBunnyFactoryAddress = (chainId: number = APP_CHAIN_ID) => {
  return xyzkBunnyFactoryAddress[chainId]
}
// export const getBeraMasterChefV3Address = (chainId: number = lineaTestnet.id) => {
//  return xyzkMasterChefV3Address[chainId]
// }
export const getPredictionsV1Address = () => {
  return getAddress(addresses.predictionsV1)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getTradingCompetitionAddressEaster = () => {
  return getAddress(addresses.tradingCompetitionEaster)
}
export const getTradingCompetitionAddressFanToken = () => {
  return getAddress(addresses.tradingCompetitionFanToken)
}

export const getTradingCompetitionAddressMobox = () => {
  return getAddress(addresses.tradingCompetitionMobox)
}

export const getTradingCompetitionAddressMoD = () => {
  return getAddress(addresses.tradingCompetitionMoD)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey])
}

export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}

export const getCakeFlexibleSideVaultAddress = () => {
  return getAddress(addresses.cakeFlexibleSideVault)
}

export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}

export const getNftMarketAddress = () => {
  return getAddress(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.pancakeSquad)
}
export const getPotteryDrawAddress = () => {
  return getAddress(addresses.potteryDraw)
}

export const getZapAddress = (chainId?: number) => {
  return getAddress(addresses.zap, chainId)
}
export const getICakeAddress = () => {
  return getAddress(addresses.iCake)
}

export const getBCakeFarmBoosterAddress = () => {
  return getAddress(addresses.bCakeFarmBooster)
}

export const getBCakeFarmBoosterProxyFactoryAddress = () => {
  return getAddress(addresses.bCakeFarmBoosterProxyFactory)
}

export const getNonBscVaultAddress = (chainId?: number) => {
  return getAddress(addresses.nonBscVault, chainId)
}

export const getCrossFarmingSenderAddress = (chainId?: number) => {
  return getAddress(addresses.crossFarmingSender, chainId)
}

export const getCrossFarmingReceiverAddress = (chainId?: number) => {
  return getAddress(addresses.crossFarmingReceiver, chainId)
}

export const getStableSwapNativeHelperAddress = (chainId?: number) => {
  return getAddress(addresses.stableSwapNativeHelper, chainId)
}

export const getMasterChefV3Address = (chainId?: number) => {
  return getAddress(addresses.masterChefV3, chainId)
}

export const getXYzKMasterChefV3Address = (chainId: number = APP_CHAIN_ID) => {
  return xyzkMasterChefV3Address[chainId]
}

export const getV3MigratorAddress = (chainId?: number) => {
  return getAddress(addresses.v3Migrator, chainId)
}

export const getTradingRewardAddress = (chainId?: number) => {
  return getAddress(addresses.tradingReward, chainId)
}

export const getV3AirdropAddress = (chainId?: number) => {
  return getAddress(addresses.v3Airdrop, chainId)
}
