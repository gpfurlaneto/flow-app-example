import {
  useEffect,
  useState,
} from 'react';

import * as fcl from '@onflow/fcl';

import FlowToken from '../icons/FlowToken';
import Loading from './Loading';

const SCRIPT_GET_BALANCE = `
  import FlowToken from 0xFlowToken
  import FungibleToken from 0xFungibleToken

  pub fun main(address: Address): UFix64 {
    let account = getAccount(address)

    let vaultRef = account.getCapability(/public/flowTokenBalance)
      .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
  }
`

interface WalletDialogProps {
  wallet: string
  onClose: () => void
}

export default function WalletDialog({ wallet, onClose }: WalletDialogProps) {

  const [response, setResponse] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getBalance = async () => {
      const resp = await fcl.query({
        cadence: SCRIPT_GET_BALANCE,
        args: (arg: any, t: any) => [arg(wallet, t.Address)],
      });
      setResponse(resp)
      setIsLoading(false)
    }
    getBalance()
  }, [])

  return (
    <div className="fixed left-0 top-0 w-full h-full flex flex-row justify-center items-center sm:justify-end sm:items-end" onClick={onClose}>
      {isLoading && <Loading />}
      <div className="relative w-full max-w-xs p-10 text-center rounded-md flex flex-col gap-4 bg-white text-black m-10">
        <svg className="absolute right-3 top-3 cursor-pointer h-4 w-4" onClick={onClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>{wallet}</span>
        <div className='flex flex-row mx-auto gap-2 justify-center items-center'>{response}<FlowToken width={20} height={20}/></div>
      </div>
    </div>
  )
}