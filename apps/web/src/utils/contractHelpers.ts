import type { Signer } from 'ethers'
import type { Provider } from '@ethersproject/providers'
import { provider } from 'utils/wagmi'
import { Contract, ethers } from 'ethers'
import { CAKE } from '@pancakeswap/tokens'

// Addresses
import {
  getPancakeProfileAddress,
  getBunnyFactoryAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getMasterChefV1Address,
  getPointCenterIfoAddress,
  getTradingCompetitionAddressEaster,
  getCakeVaultAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressFanToken,
  getTradingCompetitionAddressMobox,
  getTradingCompetitionAddressMoD,
  getICakeAddress,
  getPotteryDrawAddress,
  getCakeFlexibleSideVaultAddress,
  getPredictionsV1Address,
  getBCakeFarmBoosterAddress,
  getBCakeFarmBoosterProxyFactoryAddress,
  getNonBscVaultAddress,
  getCrossFarmingSenderAddress,
  getCrossFarmingReceiverAddress,
  getStableSwapNativeHelperAddress,
  getTradingRewardAddress,
  getMasterChefV3Address,
  getV3MigratorAddress,
  getV3AirdropAddress,
  getXYzKProfileAddress,
  getXYzKBunniesAddress,
  getXYzKMasterChefV3Address,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import xyzkTokenAbi from 'config/abi/xyzkToken.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import masterChefV1 from 'config/abi/masterchefV1.json'
import tradingCompetitionEasterAbi from 'config/abi/tradingCompetitionEaster.json'
import tradingCompetitionFanTokenAbi from 'config/abi/tradingCompetitionFanToken.json'
import tradingCompetitionMoboxAbi from 'config/abi/tradingCompetitionMobox.json'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import cakeFlexibleSideVaultV2Abi from 'config/abi/cakeFlexibleSideVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import predictionsV1Abi from 'config/abi/predictionsV1.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import potteryVaultAbi from 'config/abi/potteryVaultAbi.json'
import potteryDrawAbi from 'config/abi/potteryDrawAbi.json'
import iCakeAbi from 'config/abi/iCake.json'
import ifoV3Abi from 'config/abi/ifoV3.json'
import cakePredictionsAbi from 'config/abi/cakePredictions.json'
import bCakeFarmBoosterAbi from 'config/abi/bCakeFarmBooster.json'
import bCakeFarmBoosterProxyFactoryAbi from 'config/abi/bCakeFarmBoosterProxyFactory.json'
import bCakeProxyAbi from 'config/abi/bCakeProxy.json'
import nonBscVault from 'config/abi/nonBscVault.json'
import crossFarmingSenderAbi from 'config/abi/crossFarmingSender.json'
import crossFarmingReceiverAbi from 'config/abi/crossFarmingReceiver.json'
import crossFarmingProxyAbi from 'config/abi/crossFarmingProxy.json'
import stableSwapNativeHelperAbi from 'config/abi/stableSwapNativeHelper.json'
import sid from 'config/abi/SID.json'
import uns from 'config/abi/UNS.json'
import sidResolver from 'config/abi/SIDResolver.json'
import tradingRewardABI from 'config/abi/tradingReward.json'
import masterChefV3Abi from 'config/abi/masterChefV3.json'
import v3MigratorAbi from 'config/abi/v3Migrator.json'
import V3AirdropAbi from 'config/abi/v3Airdrop.json'
import beraProfile from 'config/abi/beraProfile.json'
import beraBunnies from 'config/abi/beraSleepBunnies.json'
import xyzkProfileAbi from 'config/abi/xyzkProfile.json'
import xyzkBunniesAbi from 'config/abi/xyzkBunnies.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  IfoV1,
  IfoV2,
  Erc20,
  Erc721,
  Cake,
  BunnyFactory,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  MasterchefV1,
  LpToken,
  TradingCompetitionEaster,
  TradingCompetitionFanToken,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
  CakeVaultV2,
  CakeFlexibleSideVaultV2,
  TradingCompetitionMobox,
  ICake,
  TradingCompetitionMoD,
  PotteryVaultAbi,
  PotteryDrawAbi,
  PredictionsV1,
  BCakeFarmBooster,
  BCakeFarmBoosterProxyFactory,
  BCakeProxy,
  NonBscVault,
  CrossFarmingSender,
  CrossFarmingReceiver,
  CrossFarmingProxy,
  StableSwapNativeHelper,
  SID,
  SIDResolver,
  TradingReward,
  MasterChefV3,
  V3Migrator,
  V3Airdrop,
  UNS,
  BeraProfile,
  BeraSleepBunnies,
  XyzkToken,
  XyzkProfile,
  XyzkBunnies,
} from 'config/abi/types'
import { ChainId } from '@pancakeswap/sdk'
import {
  APP_CHAIN_ID,
  cakeVaultV2Address,
  ftmTest,
  newProvider,
  xyzkTokenAddress,
  xyzkVaultV2Address,
} from 'config/chains'

export const getContract = ({
  abi,
  address,
  chainId = ChainId.BSC,
  signer,
}: {
  abi: any
  address: string
  chainId?: ChainId
  signer?: Signer | Provider
}) => {
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

export const getXYzKContract = ({
  abi,
  address,
  chainId = APP_CHAIN_ID,
  signer,
}: {
  abi: any
  address: string
  chainId?: ChainId
  signer?: Signer | Provider
}) => {
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: bep20Abi, address, signer }) as Erc20
}

export const getXYzKBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getXYzKContract({ abi: bep20Abi, address, signer }) as Erc20
}

export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: erc721Abi, address, signer }) as Erc721
}
export const getLpContract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: lpTokenAbi, address, signer, chainId }) as LpToken
}
export const getIfoV1Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: ifoV1Abi, address, signer }) as IfoV1
}
export const getIfoV2Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: ifoV2Abi, address, signer }) as IfoV2
}
export const getIfoV3Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: ifoV3Abi, address, signer })
}

export const getXYzKPoolAddress = (chainId?: number) => {
  return xyzkVaultV2Address[chainId ?? APP_CHAIN_ID]
}

export const getXYzKTokenContract = (signer?: Signer | Provider, chainId?: number) => {
  const appChainId = chainId ?? APP_CHAIN_ID
  const tokenAddress = xyzkTokenAddress[appChainId]
  const contractProvider = newProvider[appChainId]
  return new ethers.Contract(tokenAddress, cakeAbi, contractProvider) as XyzkToken
}

export const getPointCenterIfoContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pointCenterIfo, address: getPointCenterIfoAddress(), signer }) as PointCenterIfo
}
export const getCakeContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: xyzkTokenAbi,
    address: xyzkTokenAddress[chainId ?? APP_CHAIN_ID],
    signer,
  }) as XyzkToken
}
export const getProfileContract = (signer?: Signer | Provider) => {
  return getContract({ abi: profileABI, address: getPancakeProfileAddress(), signer }) as PancakeProfile
}

export const getXYzKProfileContract = (signer?: Signer | Provider, chainId: number = APP_CHAIN_ID) => {
  return getContract({ abi: xyzkProfileAbi, address: getXYzKProfileAddress(chainId), chainId, signer }) as XyzkProfile
}

export const getXYzKBunniesContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: xyzkBunniesAbi, address: getXYzKBunniesAddress(chainId), chainId, signer }) as XyzkBunnies
}

export const getBunnyFactoryContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bunnyFactoryAbi, address: getBunnyFactoryAddress(), signer }) as BunnyFactory
}
export const getLotteryV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: lotteryV2Abi, address: getLotteryV2Address(), signer }) as LotteryV2
}
export const getMasterchefContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: masterChef, address: getMasterChefAddress(chainId), signer }) as Masterchef
}
export const getMasterchefV1Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: masterChefV1, address: getMasterChefV1Address(), signer }) as MasterchefV1
}
export const getTradingCompetitionContractEaster = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionEasterAbi,
    address: getTradingCompetitionAddressEaster(),
    signer,
  }) as TradingCompetitionEaster
}

export const getTradingCompetitionContractFanToken = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionFanTokenAbi,
    address: getTradingCompetitionAddressFanToken(),
    signer,
  }) as TradingCompetitionFanToken
}
export const getTradingCompetitionContractMobox = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionMoboxAbi,
    address: getTradingCompetitionAddressMobox(),
    signer,
  }) as TradingCompetitionMobox
}

export const getTradingCompetitionContractMoD = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionMoDAbi,
    address: getTradingCompetitionAddressMoD(),
    signer,
  }) as TradingCompetitionMoD
}

export const getCakeVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: cakeVaultV2Abi, address: getCakeVaultAddress(), signer }) as CakeVaultV2
}

export const getCakeFlexibleSideVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({
    abi: cakeFlexibleSideVaultV2Abi,
    address: getCakeFlexibleSideVaultAddress(),
    signer,
  }) as CakeFlexibleSideVaultV2
}

export const getPredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: predictionsAbi, address, signer }) as Predictions
}

export const getPredictionsV1Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: predictionsV1Abi, address: getPredictionsV1Address(), signer }) as PredictionsV1
}

export const getCakePredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: cakePredictionsAbi, address, signer }) as Predictions
}

export const getChainlinkOracleContract = (address: string, signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: chainlinkOracleAbi, address, signer, chainId }) as ChainlinkOracle
}
export const getFarmAuctionContract = (signer?: Signer | Provider) => {
  return getContract({ abi: farmAuctionAbi, address: getFarmAuctionAddress(), signer }) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: anniversaryAchievementAbi,
    address: getAnniversaryAchievement(),
    signer,
  }) as AnniversaryAchievement
}

export const getNftMarketContract = (signer?: Signer | Provider) => {
  return getContract({ abi: nftMarketAbi, address: getNftMarketAddress(), signer }) as NftMarket
}
export const getNftSaleContract = (signer?: Signer | Provider) => {
  return getContract({ abi: nftSaleAbi, address: getNftSaleAddress(), signer }) as NftSale
}
export const getPancakeSquadContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pancakeSquadAbi, address: getPancakeSquadAddress(), signer }) as PancakeSquad
}
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  return getContract({ abi: erc721CollectionAbi, address, signer }) as Erc721collection
}

export const getPotteryVaultContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: potteryVaultAbi, address, signer }) as PotteryVaultAbi
}

export const getPotteryDrawContract = (signer?: Signer | Provider) => {
  return getContract({ abi: potteryDrawAbi, address: getPotteryDrawAddress(), signer }) as PotteryDrawAbi
}

export const getIfoCreditAddressContract = (signer?: Signer | Provider) => {
  return getContract({ abi: iCakeAbi, address: getICakeAddress(), signer }) as ICake
}

export const getBCakeFarmBoosterContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bCakeFarmBoosterAbi, address: getBCakeFarmBoosterAddress(), signer }) as BCakeFarmBooster
}

export const getBCakeFarmBoosterProxyFactoryContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: bCakeFarmBoosterProxyFactoryAbi,
    address: getBCakeFarmBoosterProxyFactoryAddress(),
    signer,
  }) as BCakeFarmBoosterProxyFactory
}

export const getBCakeProxyContract = (proxyContractAddress: string, signer?: Signer | Provider) => {
  return getContract({ abi: bCakeProxyAbi, address: proxyContractAddress, signer }) as BCakeProxy
}

export const getNonBscVaultContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: nonBscVault, address: getNonBscVaultAddress(chainId), chainId, signer }) as NonBscVault
}

export const getSidContract = (address: string, chainId: number) => {
  return getContract({ abi: sid, address, chainId }) as SID
}

export const getUnsContract = (address: string, chainId?: ChainId, signer?: Signer | Provider) => {
  return getContract({ abi: uns, chainId, address, signer }) as UNS
}

export const getSidResolverContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: sidResolver, address, signer }) as SIDResolver
}

export const getCrossFarmingSenderContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: crossFarmingSenderAbi,
    address: getCrossFarmingSenderAddress(chainId),
    chainId,
    signer,
  }) as CrossFarmingSender
}

export const getCrossFarmingReceiverContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: crossFarmingReceiverAbi,
    address: getCrossFarmingReceiverAddress(chainId),
    chainId,
    signer,
  }) as CrossFarmingReceiver
}

export const getCrossFarmingProxyContract = (
  proxyContractAddress: string,
  signer?: Signer | Provider,
  chainId?: number,
) => {
  return getContract({ abi: crossFarmingProxyAbi, address: proxyContractAddress, chainId, signer }) as CrossFarmingProxy
}

export const getStableSwapNativeHelperContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: stableSwapNativeHelperAbi,
    address: getStableSwapNativeHelperAddress(chainId),
    chainId,
    signer,
  }) as StableSwapNativeHelper
}

export const getMasterChefV3Contract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: masterChefV3Abi,
    address: getMasterChefV3Address(chainId),
    chainId,
    signer,
  }) as MasterChefV3
}

// export const getBeraMasterChefV3Contract = (chainId?: number) => {
//  const beraMasterChefV3Address = getBeraMasterChefV3Address(chainId)
//  return new ethers.Contract(beraMasterChefV3Address, masterChefV3Abi, newProvider[chainId])
// }

export const getXYzKMasterChefV3Contract = (chainId: number = APP_CHAIN_ID) => {
  const xyzkMasterChefV3Address = getXYzKMasterChefV3Address(chainId)
  return new ethers.Contract(xyzkMasterChefV3Address, masterChefV3Abi, newProvider[chainId])
}

export const getV3MigratorContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: v3MigratorAbi,
    address: getV3MigratorAddress(chainId),
    chainId,
    signer,
  }) as V3Migrator
}

export const getTradingRewardContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({
    abi: tradingRewardABI,
    address: getTradingRewardAddress(chainId),
    signer,
    chainId,
  }) as TradingReward
}

export const getV3AirdropContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: V3AirdropAbi,
    address: getV3AirdropAddress(),
    signer,
  }) as V3Airdrop
}
