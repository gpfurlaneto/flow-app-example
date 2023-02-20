import Image, { ImageLoaderProps } from 'next/image'
import useCurrentUser from '../hooks/use-current-user'
import FlowToken from '../icons/FlowToken'
import { NFT } from '../typings/Listing'
import { formatAddress } from '../utils.js/address'
import Button from './Button'

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://v1.tailwindcss.com/img/${src}?w=${width}&q=${quality || 75}`
}

interface NFTCardProps {
  price?: string,
  nft: NFT,
  onClickBuy: () => void
}

export default function NFTCard({ nft, price, onClickBuy }: NFTCardProps) {
  const currentUser = useCurrentUser()

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg border border-solid">
      <Image src="card-top.jpg" loader={myLoader} width={500} height={500} alt=""/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nft.name}</div>
        <div className="font-bold text-xs mb-2">{nft.description}</div>
        <p className="text-base">
          <span className="font-bold text-sm mb-2">Owner: </span>{formatAddress(nft.owner as string)}
        </p>
        {price && <span className='flex items-center text-3xl gap-2'>{parseFloat(price).toFixed(2)}<FlowToken /></span>}
      </div>
      <div className="px-6 pb-2 flex items-end">
        {currentUser?.addr !== nft.owner && <Button className='ml-auto w-full' onClick={onClickBuy}>Buy</Button>}
      </div>
    </div>
  )
}