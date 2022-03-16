import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <title>Minesweeper</title>
        <meta name="description" content="A simple minesweeper game" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
