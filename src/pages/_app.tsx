import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyles from 'styles/global'
import { storeWrapper } from 'redux-local'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Head>
          <title>Fifa Stats</title>
          <link rel="shortcut icon" href="/img/logo2.png" />
          <link rel="apple-touch-icon" href="/img/logo2.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Players, Teams and Teams stats from Fifa 21"
          />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  )
}

export default storeWrapper.withRedux(App)
