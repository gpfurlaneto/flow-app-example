import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from 'next/router'
import Link from "next/link";
import { authenticate, unauthenticate } from '@onflow/fcl'
import useCurrentUser from "../hooks/use-current-user";
import Dropdown from "./Dropdown";

export default function Header() {
  const router = useRouter()
  const [search, setSearch] = useState('') ?? {}
  const { addr, wallet } = useCurrentUser() ?? {}
  const walletActionLabel = wallet ?? 'Connect Wallet'

  useEffect(() => {
    if(router.query.term){
      setSearch(router.query?.term as string)
    }
  }, [router.query.term, setSearch])

  const keyboardEvents = async (event: any) => {
    if(event.key === 'Enter' && search){
      event.persist();
      router.push(`/search?term=${search.replace(/\s/g, '')}`)
    }
  }

  return (
    <div className="flex flex-row py-4 px-8 w-full mb-16 border-b border-solid border-[#222]">
      <Link className="flex flex-row items-center mr-auto" href="/">Furlaneto NFTs</Link>
      <Input className="w-[40rem] rounded-lg border border-[#5f6368]" onKeyPress={keyboardEvents} value={search} onChange={(element) => setSearch(element.target.value)}/>
      {!addr && <Button className="min-w-[10rem]" onClick={authenticate}>Connect Wallet</Button>}
      {addr && <Dropdown className="min-w-[10rem]" label={walletActionLabel} items={[
        { label: "My Wallet", action: () => alert('show wallet') },
        { label: "My NFTs", href: "/my-nfts"},
        { label: "Disconect", action: unauthenticate}
      ]}/>
      }


    </div>
  )
}
