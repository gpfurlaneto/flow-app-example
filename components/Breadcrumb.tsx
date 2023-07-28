import { useRouter } from 'next/router';

export default function Breadcrumb() {
  const router = useRouter();
  const labels: any = {
    "/": "Home",
    "/my-nfts": "My NFTs",
    "/search": "Search",
  };

  const Warning = () => {
    return (
      <span className='flex flex-row gap-2'>
       <svg className="w-6 h-6 min-w-fit min-h-fit fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path></svg>
        This project was tested with blocto wallet. You may experience unexpected bahavior buying with a differente wallet.
      </span>
    )
  }

 
  return (
    <div className="mb-5 mr-auto flex flex-col md:flex-row gap-2">{labels[router.pathname as string]} {router.pathname === '/' ? Warning() : ''}</div>
  );
}
