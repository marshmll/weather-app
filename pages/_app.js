import { createGlobalStyle } from 'styled-components'
import Head from '../src/infra/components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: #0066cc;
    color: white;
    user-select: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head title="Weather App" iconHref="https://www.svgrepo.com/show/119535/sun.svg"></Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
