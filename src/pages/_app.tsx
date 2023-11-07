import GlobalLayout from '@/layouts/global'
import '@/styles/globals.css'
import '@mantine/core/styles.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { MantineProvider, createTheme } from '@mantine/core'

axios.defaults.baseURL = 'https://6396aee2a68e43e41808fa18.mockapi.io/api'


const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
  return <MantineProvider theme={theme}>
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  </MantineProvider>
}
