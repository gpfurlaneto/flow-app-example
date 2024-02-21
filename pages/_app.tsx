import '../styles/globals.css';
import '../flow/config';

import { useState } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import Breadcrumb from '../components/Breadcrumb';
import Header from '../components/Header';
import Loading from '../components/Loading';
import LoadingContext from '../hooks/LoadingContext';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Head>
        <title>Flow App - Furlaneto NFTs</title>
        <meta name="description" content="An application created for studies about Flow blockchain using react framework, to sell Furlaneto NFTs on testnet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <LoadingContext.Provider value={{ setIsLoading }}>
          <Header />
          {isLoading && <Loading />}
          <div className="w-full h-full px-8 pb-16 flex flex-col justify-center items-center flex-1">
            <div className="w-full px-0 lg:px-44">
              <Breadcrumb />
              <Component {...pageProps} />
            </div>
          </div>
        </LoadingContext.Provider>
      </main>
      <footer className="flex flex-col flex-1 py-8 mx-8 justify-center items-center border-t border-solid border-[#222] gap-2">
        <a
          href="https://github.com/gpfurlaneto/flow-app-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Guilherme Furlaneto
        </a>
        <div className='flex flex-row items-center'>
          <a href="https://github.com/gpfurlaneto/flow-app-example" target="_blank" rel="noopener noreferrer" className='bg-white w-fit h-fit rounded-sm'>
            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle color-fg-default">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/guilhermefurlaneto/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z" /><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z" /></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
