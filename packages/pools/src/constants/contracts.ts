import { ChainId } from '@pancakeswap/sdk'

export type ContractAddresses = {
  [chainId: number]: string
}

export const ICAKE = {
  [ChainId.BSC]: '0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1',
  [ChainId.BSC_TESTNET]: '',
  4002: '0x96bB02c9786DE2cb9FF6b650DA29f7FA7F21BDEE',
  59140: '0x0972966cF0fFa4F4f425F57A70Bc8568EeF422Bd',
  59144: '',
} as ContractAddresses

export const CAKE_VAULT = {
  [ChainId.BSC]: '0x45c54210128a065de780C4B0Df3d16664f7f859e',
  [ChainId.BSC_TESTNET]: '0x683433ba14e8F26774D43D3E90DA6Dd7a22044Fe',
  4002: '0xAE06cF3a2247aea8217e95E2e26b440bfB7C9b99',
  59140: '0x534098b02BBbafcBaFc6174bf06717245BE01C06',
  59144: '',
} as ContractAddresses

export const CAKE_FLEXIBLE_SIDE_VAULT = {
  [ChainId.BSC]: '0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0',
  [ChainId.BSC_TESTNET]: '',
  4002: '0xFb9e73081EF7AF9E61E736226ac3B7f3d387C772',
  59140: '0x6A35A8a03A2aAc37Df0C2ebC70F89D0716107DD3',
  59144: '',
} as ContractAddresses
