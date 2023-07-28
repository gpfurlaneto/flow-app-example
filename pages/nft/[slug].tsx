import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NFT() {
  const router = useRouter()
  return <div className="flex flex-row justify-center">
   <Image src={encodeURI(`https://gateway.pinata.cloud/ipfs/${router.query.slug}`)} width={700} height={700} alt="" />
  </div>
}