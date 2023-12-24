import { linea, lineaTestnet } from '@xyzk/wagmi-chains'
import { Call, MultiCall, MultiCallV2 } from '@pancakeswap/multicall'
import { ftmTest, getXYzKMulticallContract, xyzkMasterChefV3Address } from 'config/chains'
import { Interface, Fragment } from '@ethersproject/abi'
import { MulticallV3Params } from 'config'
import { ComputedFarmConfigV3, FarmV3DataWithPrice } from '@pancakeswap/farms'
import {
  CommonPrice,
  farmV3FetchFarms,
  fetchMasterChefV3Data,
  getCakeApr,
  LPTvl,
} from '@pancakeswap/farms/src/fetchFarmsV3'
import BigNumber from 'bignumber.js'

export const DEFAULT_COMMON_PRICE = {
  56: {},
  4002: {
    '0x26d8777A043BE096cB212deA533D101750d9C272': '1',
  },
  [lineaTestnet.id]: {
    '0x37e16520C636E184E766A13f0339F61f263a56a5': '1',
  },
}

export function createMulticall() {
  const xyzkMulticallv3 = async ({ calls, chainId = ftmTest.chainId, allowFailure, overrides }: MulticallV3Params) => {
    const multi = getXYzKMulticallContract(chainId)
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const interfaceCache = new WeakMap()
    const _calls = calls.map(({ abi, address, name, params, allowFailure: _allowFailure }) => {
      let itf = interfaceCache.get(abi)
      if (!itf) {
        itf = new Interface(abi)
        interfaceCache.set(abi, itf)
      }
      if (!itf.fragments.some((fragment: Fragment) => fragment.name === name))
        console.error(`${name} missing on ${address}`)
      const callData = itf.encodeFunctionData(name, params ?? [])
      return {
        target: address.toLowerCase(),
        allowFailure: allowFailure || _allowFailure,
        callData,
      }
    })

    const result = await multi.callStatic.aggregate3(_calls, ...(overrides ? [overrides] : []))

    return result.map((call: any, i: number) => {
      const { returnData, success } = call
      if (!success || returnData === '0x') return null
      const { abi, name } = calls[i]
      const itf = interfaceCache.get(abi)
      const decoded = itf?.decodeFunctionResult(name, returnData)
      return decoded
    })
  }
  const xyzkMulticallv2: MultiCallV2 = async ({ abi, calls, chainId = ftmTest.chainId, options }) => {
    const { requireSuccess = true, ...overrides } = options || {}
    const multi = getXYzKMulticallContract()
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))

    const returnData = await multi.callStatic.tryAggregate(requireSuccess, calldata, overrides)
    const res = returnData.map((call: any, i: number) => {
      const [result, data] = call
      return result && data !== '0x' ? itf.decodeFunctionResult(calls[i].name, data) : null
    })

    return res as any
  }

  const xyzkMulticall: MultiCall = async (abi: any[], calls: Call[], chainId = ftmTest.chainId) => {
    const multi = getXYzKMulticallContract()
    if (!multi) throw new Error(`Multicall Provider missing for ${chainId}`)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params),
    }))
    const { returnData } = await multi.callStatic.aggregate(calldata)

    const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))

    return res as any
  }
  return {
    xyzkMulticall,
    xyzkMulticallv2,
    xyzkMulticallv3,
  }
}

export const { xyzkMulticall, xyzkMulticallv2, xyzkMulticallv3 } = createMulticall()

const supportedChainIdV3 = [ftmTest.chainId, lineaTestnet.id, linea.id]

export function xyzkCreateFarmFetcherV3(multicallv2: MultiCallV2) {
  const fetchFarms = async ({
    farms,
    chainId,
    commonPrice,
  }: {
    chainId: any
    farms: ComputedFarmConfigV3[]
    commonPrice: CommonPrice
  }) => {
    const masterChefAddress = xyzkMasterChefV3Address[chainId]
    if (!masterChefAddress) {
      throw new Error('Unsupported chain')
    }

    try {
      const { poolLength, totalAllocPoint, latestPeriodCakePerSecond } = await fetchMasterChefV3Data({
        multicallv2,
        masterChefAddress,
        chainId,
      })

      const cakePerSecond = new BigNumber(latestPeriodCakePerSecond.toString()).div(1e18).div(1e12).toString()

      const farmsWithPrice = await farmV3FetchFarms({
        farms,
        chainId,
        multicallv2,
        masterChefAddress,
        totalAllocPoint,
        commonPrice,
      })

      return {
        poolLength: poolLength.toNumber(),
        farmsWithPrice,
        cakePerSecond,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCakeAprAndTVL = (farm: FarmV3DataWithPrice, lpTVL: LPTvl, cakePrice: string, cakePerSecond: string) => {
    const [token0Price, token1Price] = farm.token.sortsBefore(farm.quoteToken)
      ? [farm.tokenPriceBusd, farm.quoteTokenPriceBusd]
      : [farm.quoteTokenPriceBusd, farm.tokenPriceBusd]
    const tvl = new BigNumber(token0Price).times(lpTVL.token0).plus(new BigNumber(token1Price).times(lpTVL.token1))

    const cakeApr = getCakeApr(farm.poolWeight, tvl, cakePrice, cakePerSecond)

    return {
      activeTvlUSD: tvl.toString(),
      activeTvlUSDUpdatedAt: lpTVL.updatedAt,
      cakeApr,
    }
  }

  return {
    fetchFarms,
    getCakeAprAndTVL,
    isChainSupported: (chainId: number) => supportedChainIdV3.includes(chainId),
    supportedChainId: supportedChainIdV3,
    isTestnet: (chainId: number) => [ftmTest.chainId].includes(chainId),
  }
}
