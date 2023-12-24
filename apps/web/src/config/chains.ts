import { ChainId, ERC20Token } from '@pancakeswap/sdk'

import memoize from 'lodash/memoize'
import invert from 'lodash/invert'
import { XyzkToken } from 'config/abi/types'
import { bsc, bscTestnet, goerli, mainnet, linea, lineaTestnet } from '@xyzk/wagmi-chains'
import { ethers, Signer } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { getXYzKBunnyFactoryAddress } from 'utils/addressHelpers'
import multicall3Abi from './abi/Multicall.json'
import bunnyAbi from './abi/bunnyFactory.json'
import xyzkTokenAbi from './abi/xyzkToken.json'

export const CHAIN_QUERY_NAME = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC]: 'bsc',
  [ChainId.BSC_TESTNET]: 'bscTestnet',
  4002: 'ftmTestnet',
  59144: 'linea',
  59140: 'lineaTestnet',
}

export const EXPLORER_URL = {
  [linea.id]: linea.blockExplorers.default.url,
  [lineaTestnet.id]: lineaTestnet.blockExplorers.default.url,
}

// export const beraMulticallAddress = {
//  4002: '0xE4019DfBc58f54fa4CE48EE90220FAd328A1A93c',
// }

export const APP_CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})

export const CHAINS = [bsc, mainnet, bscTestnet, goerli, linea, lineaTestnet]

export interface IBlockChainData {
  chainId: number
  rpc: string
  name: string
  symbol: string
  hexChainId: string
  blockExplorer: string
  decimal: number
}

export enum LineaChainId {
  ETHEREUM = 1,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  LINEA_TESTNET = 59140,
  LINEA_MAINNET = 59144,
}

export const ftmTest: IBlockChainData = {
  chainId: 4002,
  rpc: 'https://rpc.testnet.fantom.network',
  name: 'Fantom testnet',
  symbol: 'FTM',
  hexChainId: '0xfa2',
  blockExplorer: 'https://testnet.ftmscan.com',
  decimal: 18,
}

export const bscMainnet: IBlockChainData = {
  chainId: 56,
  rpc: 'https://bsc.rpc.blxrbdn.com',
  name: 'BSC Mainnet',
  symbol: 'BNB',
  hexChainId: '0x38',
  blockExplorer: 'https://bscscan.com/',
  decimal: 18,
}

export const blockChainData = {
  56: bscMainnet,
  4002: ftmTest,
}

export const beraNftMarketV1 = {
  4002: '0xF47Eb2Aa00f760Ab863f0fa00675e05785DA3A80',
}

export const xyzkNftMarketV1 = {
  [lineaTestnet.id]: '0x30F3DcdD2cdEaBc425B3373ba7E7D778534eED7F',
  [linea.id]: '',
}

export const cakeVaultV2Address = {
  // BeraSleepPool
  4002: '0xAE06cF3a2247aea8217e95E2e26b440bfB7C9b99',
}

export const xyzkVaultV2Address = {
  [lineaTestnet.id]: '0x534098b02BBbafcBaFc6174bf06717245BE01C06',
  [linea.id]: '',
}

// export const beraTokenAddress = {
//  4002: '0xC938173CccA0f3C917A0dC799B3dbEF89626fE2B',
// }

export const xyzkTokenAddress = {
  [lineaTestnet.id]: '0x707dc1041dc702a83F7a0af57dDe1a3cdAC9643e',
  [linea.id]: '',
}

// export const beraSleepProfileAddress = {
//  4002: '0xAec50Cc30f13Ce836c81314f83486a6A06D75BD2',
// }

export const xyzkProfileAddress = {
  [lineaTestnet.id]: '0x0E59D921E2E8E14AB20276b064abAB0417c30A57',
  [linea.id]: '',
}

// export const beraMulticallAddress = {
//  4002: '0xE4019DfBc58f54fa4CE48EE90220FAd328A1A93c',
// }

export const xyzkMulticallAddress = {
  [lineaTestnet.id]: '0xBA736a65D287D63012caF07558CA33abC925ea64',
  [linea.id]: '',
}

// export const beraBunnyFactoryAddress = {
//  4002: '0xD7c6BE9b454C9a0fCd45462C0317F5e7fe630Fe9',
// }

export const xyzkBunnyFactoryAddress = {
  [lineaTestnet.id]: '0x2d500dEf175EdB07fb0C4358e32C1CFa16128715',
  [linea.id]: '',
}

export const xyzkMasterChefV3Address = {
  4002: '0x70F3Db6104306c739Ee3fddc4cAbF1EE36fE9108',
  56: '0x556B9306565093C855AEA9AE92A594704c2Cd59e',
  [lineaTestnet.id]: '0xA59788bE88b62350bDF811b80c312FC52dc66206',
  [linea.id]: '',
}

export const beraSleepBunniesAddress = {
  4002: '0xd29B0c964638200b709e0558651a28Ac4bb16AF4',
}

export const xyzkBunniesAddress = {
  [lineaTestnet.id]: '0xa6EBaDD1325b83c42Ef011c0301Aeafc13aF007c',
  [linea.id]: '',
}

export const newProvider = {
  [ftmTest.chainId]: new ethers.providers.StaticJsonRpcProvider(ftmTest.rpc),
  [bscMainnet.chainId]: new ethers.providers.StaticJsonRpcProvider(bscMainnet.rpc),
  [lineaTestnet.id]: new ethers.providers.StaticJsonRpcProvider(lineaTestnet.rpcUrls.public.http[0]),
  [linea.id]: new ethers.providers.StaticJsonRpcProvider(linea.rpcUrls.public.http[0]),
}

export const getXYzKMulticallContract = (chainId: number = APP_CHAIN_ID) => {
  const multicallAddress = xyzkMulticallAddress[chainId ?? lineaTestnet.id]
  return new ethers.Contract(multicallAddress, multicall3Abi, newProvider[chainId])
}

export const getXYzKBunnyFactoryContract = (chainId: number = APP_CHAIN_ID, signerOrProvider?: Signer | Provider) => {
  const bunnyFactoryAddress = getXYzKBunnyFactoryAddress(chainId)
  return new ethers.Contract(bunnyFactoryAddress, bunnyAbi, signerOrProvider ?? newProvider[chainId])
}

export const XYZK_TOKEN_ADDRESS = {
  4002: '0xC938173CccA0f3C917A0dC799B3dbEF89626fE2B',
  [lineaTestnet.id]: '0x707dc1041dc702a83F7a0af57dDe1a3cdAC9643e',
  [linea.id]: '',
}

export const getXYzKTokenContract = (chainId: number = APP_CHAIN_ID, signerOrProvider?: Signer | Provider) => {
  const address = XYZK_TOKEN_ADDRESS[chainId]
  return new ethers.Contract(address, xyzkTokenAbi, signerOrProvider ?? newProvider[chainId]) as XyzkToken
}

export const xyzkApiCollection = {
  '0xd29B0c964638200b709e0558651a28Ac4bb16AF4': {
    active: true,
    address: '0xd29B0c964638200b709e0558651a28Ac4bb16AF4',
    avatar: 'https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/avatar.png',
    banner: {
      large: 'https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/banner-lg.png',
      small: '"https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/banner-sm.png"',
    },
    createdAt: '2020-12-11T02:32:55.000Z',
    creatorAddress: '0x0000000000000000000000000000000000000000',
    creatorFee: '0',
    description:
      'Pancake Bunnies are PancakeSwap’s first lovingly home-raised NFT collection. Earn bunnies by completing tasks, winning competitions, and more!',
    id: '0xd29B0c964638200b709e0558651a28Ac4bb16AF4',
    name: 'BeraSleep Bunnies',
    numberTokensListed: '24642',
    owner: '0x8016Eb5178d2b0a53d42Ed4D13A6a17C2078228a',
    symbol: 'BB',
    totalSupply: '968330',
    totalTrades: '113491',
    totalVolumeBNB: '34611.208827886752432609',
    tradingFee: '2',
    updatedAt: '2020-12-11T02:32:55.000Z',
    verified: true,
    whitelistChecker: '0x0000000000000000000000000000000000000000',
  },
  '0xa6EBaDD1325b83c42Ef011c0301Aeafc13aF007c': {
    active: true,
    address: '0xa6EBaDD1325b83c42Ef011c0301Aeafc13aF007c',
    avatar: 'https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/avatar.png',
    banner: {
      large: 'https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/banner-lg.png',
      small: '"https://static-nft.pancakeswap.com/mainnet/0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07/banner-sm.png"',
    },
    createdAt: '2020-12-11T02:32:55.000Z',
    creatorAddress: '0x0000000000000000000000000000000000000000',
    creatorFee: '0',
    description:
      "XYZK Bunnies are XYZK's first lovingly home-raised NFT collection. Earn bunnies by completing tasks, winning competitions, and more!",
    id: '0xd29B0c964638200b709e0558651a28Ac4bb16AF4',
    name: 'XYZK Bunnies',
    numberTokensListed: '24642',
    owner: '0xa704E892bEA147efBab858184af2FfBad625564b',
    symbol: 'XB',
    totalSupply: '968330',
    totalTrades: '113491',
    totalVolumeBNB: '34611.208827886752432609',
    tradingFee: '2',
    updatedAt: '2020-12-11T02:32:55.000Z',
    verified: true,
    whitelistChecker: '0x0000000000000000000000000000000000000000',
  },
}

export const getBeraNftMarketAddress = (chainId: number = ftmTest.chainId) => {
  return beraNftMarketV1[chainId]
}

export const getXYzKNftMarketAddress = (chainId: number = APP_CHAIN_ID) => {
  return xyzkNftMarketV1[chainId]
}

export const XYZK_API = process.env.NEXT_PUBLIC_API_URL
