import fs from 'fs'
import { useRouter } from 'next/router'
import path from 'path'
import { useEffect } from 'react'
import NFTList from "../components/NFTList"
import useCurrentUser from '../hooks/use-current-user'

export async function getServerSideProps() {
  const getAllListingsCode = fs.readFileSync(path.join(__dirname, '../../../cadence/scripts/get_my_nfts.cdc')).toString()
  return {
    props: {
      getAllListingsCode,
    }, // will be passed to the page component as props
  }
}

interface MyNFTsProps {
  getAllListingsCode: string,
}

export default function MyNFTs({ getAllListingsCode }: MyNFTsProps) {
  const router = useRouter()
  const user = useCurrentUser()

  useEffect(() => {
    if(user && !user.addr){
      router?.push('/')
    }
  }, [user, router])

  return (
    user?.addr && 
    <NFTList address={user.addr as string} getItemsScriptCode={getAllListingsCode} />
  )
}