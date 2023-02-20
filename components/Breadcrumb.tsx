import { useRouter } from "next/router"

export default function Breadcrumb() {
  const router = useRouter()
  const label = router.asPath === '/' ? 'Home' : 'My NFTs'
  return (
    <div className='mb-5 mr-auto'>{label}</div>
  )
}