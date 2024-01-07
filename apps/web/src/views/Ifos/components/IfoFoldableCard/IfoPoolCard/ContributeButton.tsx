import { useTranslation } from '@pancakeswap/localization'
import { Button, IfoGetTokenModal, useModal, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Ifo, PoolIds } from 'config/constants/types'
import useTokenBalance, { useXYzKTokenBalance } from 'hooks/useTokenBalance'
import { useCurrentBlock } from 'state/block/hooks'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { PublicIfoData, WalletIfoData } from 'views/Ifos/types'
import ContributeModal from './ContributeModal'

interface Props {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}
const ContributeButton: React.FC<React.PropsWithChildren<Props>> = ({ poolId, ifo, publicIfoData, walletIfoData }) => {
  const publicPoolCharacteristics = publicIfoData[poolId]
  const userPoolCharacteristics = walletIfoData[poolId]
  const { isPendingTx, amountTokenCommittedInLP } = userPoolCharacteristics
  const { limitPerUserInLP } = publicPoolCharacteristics
  console.log(
    '🚀 ~ file: ContributeButton.tsx:23 ~ publicPoolCharacteristics:',
    new BigNumber(limitPerUserInLP).toString(),
  )

  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const currentBlock = useCurrentBlock()
  const { balance: userCurrencyBalance } = useXYzKTokenBalance(ifo.currency.address)
  console.log(
    '🚀 ~ file: ContributeButton.tsx:32 ~ userCurrencyBalance:',
    new BigNumber(userCurrencyBalance).toString(),
  )

  // Refetch all the data, and display a message when fetching is done
  const handleContributeSuccess = async (amount: BigNumber, txHash: string) => {
    await Promise.all([publicIfoData.fetchIfoData(currentBlock), walletIfoData.fetchIfoData()])
    toastSuccess(
      t('Success!'),
      <ToastDescriptionWithTx txHash={txHash}>
        {t('You have contributed %amount% CAKE to this IFO!', {
          amount: getBalanceNumber(amount),
        })}
      </ToastDescriptionWithTx>,
    )
  }

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      poolId={poolId}
      creditLeft={walletIfoData.ifoCredit?.creditLeft}
      ifo={ifo}
      publicIfoData={publicIfoData}
      walletIfoData={walletIfoData}
      onSuccess={handleContributeSuccess}
      userCurrencyBalance={userCurrencyBalance}
    />,
    false,
  )

  const [onPresentGetTokenModal] = useModal(
    <IfoGetTokenModal
      symbol={ifo.currency.symbol}
      address={ifo.currency.address}
      imageSrc={`/images/tokens/${ifo.currency.address}.png`}
    />,
    false,
  )

  const needCredit = ifo.version >= 3.1 && poolId === PoolIds.poolBasic
  console.log('🚀 ~ file: ContributeButton.tsx:64 ~ noNeedCredit:', needCredit)
  console.log('credit', new BigNumber(walletIfoData.ifoCredit?.creditLeft).toString())

  const isMaxCommitted =
    (needCredit && walletIfoData.ifoCredit?.creditLeft && walletIfoData.ifoCredit?.creditLeft.isLessThanOrEqualTo(0)) ||
    (limitPerUserInLP.isGreaterThan(0) && amountTokenCommittedInLP.isGreaterThanOrEqualTo(limitPerUserInLP))

  const check1 =
    needCredit && walletIfoData.ifoCredit?.creditLeft && walletIfoData.ifoCredit?.creditLeft.isLessThanOrEqualTo(0)
  const check2 = limitPerUserInLP.isGreaterThan(0) && amountTokenCommittedInLP.isGreaterThanOrEqualTo(limitPerUserInLP)

  console.log('isMaxCommitted', needCredit)
  const isDisabled = isPendingTx || isMaxCommitted || publicIfoData.status !== 'live'

  return (
    <Button
      onClick={userCurrencyBalance.isEqualTo(0) ? onPresentGetTokenModal : onPresentContributeModal}
      width="100%"
      disabled={isDisabled}
    >
      {isMaxCommitted && publicIfoData.status === 'live' ? t('Max. Committed') : t('Commit XYzK')}
    </Button>
  )
}

export default ContributeButton
