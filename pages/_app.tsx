import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { GlobalDialog } from 'views/common/GlobalDialog/GlobalDialog'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jira</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <GlobalDialog />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
