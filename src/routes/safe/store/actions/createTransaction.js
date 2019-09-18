// @flow
import type { Dispatch as ReduxDispatch, GetState } from 'redux'
import { EMPTY_DATA } from '~/logic/wallets/ethTransactions'
import { userAccountSelector } from '~/logic/wallets/store/selectors'
import fetchTransactions from '~/routes/safe/store/actions/fetchTransactions'
import { type GlobalState } from '~/store'
import { getGnosisSafeInstanceAt } from '~/logic/contracts/safeContracts'
import {
  approveTransaction,
  executeTransaction,
  CALL,
} from '~/logic/safe/transactions'
import {
  type Notifications,
  NOTIFICATIONS,
} from '~/logic/notifications'
import { type Variant, SUCCESS, ERROR } from '~/components/Header'

const createTransaction = (
  safeAddress: string,
  to: string,
  valueInWei: string,
  txData: string = EMPTY_DATA,
  enqueueSnackbar: (message: string, variant: Variant) => void,
  shouldExecute?: boolean,
  notifications?: Notifications = NOTIFICATIONS,
) => async (dispatch: ReduxDispatch<GlobalState>, getState: GetState<GlobalState>) => {
  const state: GlobalState = getState()

  const safeInstance = await getGnosisSafeInstanceAt(safeAddress)
  const from = userAccountSelector(state)
  const threshold = await safeInstance.getThreshold()
  const nonce = (await safeInstance.nonce()).toString()
  const isExecution = threshold.toNumber() === 1 || shouldExecute

  let txHash
  try {
    if (isExecution) {
      const showNotification = () => enqueueSnackbar(notifications.BEFORE_EXECUTION_OR_CREATION, { variant: SUCCESS })
      txHash = await executeTransaction(showNotification, safeInstance, to, valueInWei, txData, CALL, nonce, from)
      enqueueSnackbar(notifications.AFTER_EXECUTION, { variant: SUCCESS })
    } else {
      const showNotification = () => enqueueSnackbar(notifications.BEFORE_EXECUTION_OR_CREATION, { variant: SUCCESS })
      txHash = await approveTransaction(showNotification, safeInstance, to, valueInWei, txData, CALL, nonce, from)
      enqueueSnackbar(notifications.CREATED_MORE_CONFIRMATIONS_NEEDED, { variant: SUCCESS })
    }
  } catch (err) {
    enqueueSnackbar(notifications.ERROR, { variant: ERROR })
    console.error(`Error while creating transaction: ${err}`)
  }

  dispatch(fetchTransactions(safeAddress))

  return txHash
}

export default createTransaction
