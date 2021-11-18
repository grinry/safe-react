import { RequestId, calculateMessageHash } from '@gnosis.pm/safe-apps-sdk'
import { ReactElement } from 'react'

import { getWeb3ReadOnly } from 'src/logic/wallets/getWeb3'
import { ZERO_ADDRESS } from 'src/logic/wallets/ethAddresses'
import { getSignMessageLibContractInstance, getSignMessageLibAddress } from 'src/logic/contracts/safeContracts'
import Modal from 'src/components/Modal'
import { SafeApp } from 'src/routes/safe/components/Apps/types'
import { ReviewMessage } from './ReviewMessage'
import { currentNetworkId } from 'src/logic/config/store/selectors'
import { useSelector } from 'react-redux'
import { hexToUtf8, isHexStrict } from 'web3-utils'

export type SignMessageModalProps = {
  isOpen: boolean
  app: SafeApp
  message: string
  safeAddress: string
  safeName: string
  requestId: RequestId
  ethBalance: string
  onUserConfirm: (safeTxHash: string, requestId: RequestId) => void
  onTxReject: (requestId: RequestId) => void
  onClose: () => void
}

const convertToHumanReadableMessage = (message: string): string => {
  const isHex = isHexStrict(message.toString())

  let humanReadableMessage = message
  if (isHex) {
    try {
      humanReadableMessage = hexToUtf8(message)
    } catch (e) {
      // do nothing
    }
  }

  return humanReadableMessage
}

export const SignMessageModal = ({ message, isOpen, ...rest }: SignMessageModalProps): ReactElement => {
  const web3 = getWeb3ReadOnly()
  const networkId = useSelector(currentNetworkId)
  const txRecipient = getSignMessageLibAddress(networkId) || ZERO_ADDRESS
  const txData = getSignMessageLibContractInstance(web3, networkId)
    .methods.signMessage(calculateMessageHash(message))
    .encodeABI()

  const readableData = convertToHumanReadableMessage(message)

  return (
    <Modal description="Safe App transaction" title="Safe App transaction" open={isOpen}>
      <ReviewMessage {...rest} txRecipient={txRecipient} txData={txData} utf8Message={readableData} />
    </Modal>
  )
}
