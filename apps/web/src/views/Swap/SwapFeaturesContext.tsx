import React, { createContext, useState, useEffect, useMemo } from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useExchangeChartManager } from 'state/user/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { LineaChainId } from 'config/chains'

export const SwapFeaturesContext = createContext<{
  isChartSupported: boolean
  isStableSupported: boolean
  isAccessTokenSupported: boolean
  isChartExpanded: boolean
  isChartDisplayed: boolean
  setIsChartExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setIsChartDisplayed: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isChartSupported: false,
  isStableSupported: false,
  isAccessTokenSupported: false,
  isChartExpanded: false,
  isChartDisplayed: false,
  setIsChartExpanded: null,
  setIsChartDisplayed: null,
})

const CHART_SUPPORT_CHAIN_IDS = [
  LineaChainId.BSC,
  LineaChainId.BSC_TESTNET,
  LineaChainId.LINEA_TESTNET,
  LineaChainId.LINEA_MAINNET,
  // ChainId.ETHEREUM
]
const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [LineaChainId.BSC]
const STABLE_SUPPORT_CHAIN_IDS = [LineaChainId.BSC_TESTNET, LineaChainId.BSC, LineaChainId.LINEA_MAINNET]

export const SwapFeaturesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isMobile } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)
  const [isChartExpanded, setIsChartExpanded] = useState(false)

  const isChartSupported = useMemo(
    () =>
      // avoid layout shift, by default showing
      !chainId || CHART_SUPPORT_CHAIN_IDS.includes(chainId),
    [chainId],
  )

  const isStableSupported = useMemo(() => !chainId || STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  const value = useMemo(() => {
    return {
      isChartSupported,
      isStableSupported,
      isAccessTokenSupported,
      isChartDisplayed,
      setIsChartDisplayed,
      isChartExpanded,
      setIsChartExpanded,
    }
  }, [
    isChartSupported,
    isStableSupported,
    isAccessTokenSupported,
    isChartDisplayed,
    setIsChartDisplayed,
    isChartExpanded,
    setIsChartExpanded,
  ])

  return <SwapFeaturesContext.Provider value={value}>{children}</SwapFeaturesContext.Provider>
}
