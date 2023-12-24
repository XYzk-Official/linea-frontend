import { useMemo, useRef } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useGetCollections } from 'state/nftMarket/hooks'
import { NftLocation, ApiCollections } from 'state/nftMarket/types'
import { Profile } from 'state/types'
import { getXYzKCompleteAccountNftData, getCompleteAccountNftData } from 'state/nftMarket/helpers'
import useSWR from 'swr'
import { FetchStatus } from 'config/constants/types'
import { usePreviousValue } from '@pancakeswap/hooks'
import { isAddress } from 'utils'
import { xyzkApiCollection } from 'config/chains'
import { useXYzKBunniesContract } from 'hooks/useContract'

export const useNftsForAddress = (account: string, profile: Profile, isProfileFetching: boolean) => {
  const { data: collections } = useGetCollections()
  console.log('collections', collections)

  const { nfts, isLoading, refresh } = useCollectionsNftsForAddress(account, profile, isProfileFetching, collections)
  console.log('🚀 ~ file: useNftsForAddress.tsx:17 ~ useNftsForAddress ~ nfts:', nfts)

  return { nfts, isLoading, refresh }
}

export const useXYzKNftsForAddress = (account: string, profile: Profile, isProfileFetching: boolean) => {
  const collections = { ...xyzkApiCollection }
  console.log('collections', collections)

  const { nfts, isLoading, refresh } = useXYzKCollectionsNftsForAddress(
    account,
    profile,
    isProfileFetching,
    collections,
  )
  console.log('🚀 ~ file: useNftsForAddress.tsx:17 ~ useNftsForAddress ~ nfts:', nfts)

  return { nfts, isLoading, refresh }
}

export const useCollectionsNftsForAddress = (
  account: string,
  profile: Profile,
  isProfileFetching: boolean,
  collections: ApiCollections,
) => {
  console.log('🚀 ~ file: useNftsForAddress.tsx:28 ~ profile:', profile)
  const resetLaggyRef = useRef(null)
  const previousAccount = usePreviousValue(account)
  console.log('🚀 ~ file: useNftsForAddress.tsx:30 ~ previousAccount:', previousAccount)

  if (resetLaggyRef.current && previousAccount !== account) {
    resetLaggyRef.current()
  }
  const hasProfileNft = profile?.tokenId
  const profileNftTokenId = profile?.tokenId?.toString()
  const profileNftCollectionAddress = profile?.collectionAddress

  const profileNftWithCollectionAddress = useMemo(() => {
    if (hasProfileNft) {
      return {
        tokenId: profileNftTokenId,
        collectionAddress: profileNftCollectionAddress,
        nftLocation: NftLocation.PROFILE,
      }
    }
    return null
  }, [profileNftTokenId, profileNftCollectionAddress, hasProfileNft])

  // @ts-ignore
  const { status, data, mutate, resetLaggy } = useSWR(
    !isProfileFetching && !isEmpty(collections) && isAddress(account) ? [account, 'userNfts'] : null,
    async () => getCompleteAccountNftData(account, collections, profileNftWithCollectionAddress),
    {
      keepPreviousData: true,
    },
  )

  resetLaggyRef.current = resetLaggy

  return { nfts: data ?? [], isLoading: status !== FetchStatus.Fetched, refresh: mutate }
}

export const useXYzKCollectionsNftsForAddress = (
  account: string,
  profile: Profile,
  isProfileFetching: boolean,
  collections: ApiCollections,
) => {
  const resetLaggyRef = useRef(null)
  const previousAccount = usePreviousValue(account)
  const beraBunniesContract = useXYzKBunniesContract()

  if (resetLaggyRef.current && previousAccount !== account) {
    resetLaggyRef.current()
  }
  const hasProfileNft = profile?.isActive
  console.log('🚀 ~ file: useNftsForAddress.tsx:96 ~ hasProfileNft:', hasProfileNft)
  const profileNftTokenId = profile?.tokenId?.toString()
  const profileNftCollectionAddress = profile?.collectionAddress

  const profileNftWithCollectionAddress = useMemo(() => {
    if (hasProfileNft) {
      return {
        tokenId: profileNftTokenId,
        collectionAddress: profileNftCollectionAddress,
        nftLocation: NftLocation.PROFILE,
      }
    }
    return null
  }, [profileNftTokenId, profileNftCollectionAddress, hasProfileNft])

  // @ts-ignore
  const { status, data, mutate, resetLaggy } = useSWR(
    !isProfileFetching && !isEmpty(collections) && isAddress(account) ? [account, 'userNfts'] : null,
    async () =>
      getXYzKCompleteAccountNftData(account, collections, beraBunniesContract, profileNftWithCollectionAddress),
    {
      keepPreviousData: true,
    },
  )

  resetLaggyRef.current = resetLaggy

  return { nfts: data ?? [], isLoading: status !== FetchStatus.Fetched, refresh: mutate }
}
