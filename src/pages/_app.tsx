// ** Next Imports
import type { AppProps } from 'next/app'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from '../store'

// ** Global Styles

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
