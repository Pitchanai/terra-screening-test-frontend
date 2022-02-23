import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import Head from 'next/head'

import { useSetup } from 'hooks/useSetup'

import { theme } from 'themes/default'

import { GlobalDialog } from 'views/common/GlobalDialog/GlobalDialog'

function MyApp({ Component, pageProps }: AppProps) {
  const { isReady: _ } = useSetup()

  return (
    <>
      <Head>
        <title>Jira</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalDialog />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
