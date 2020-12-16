import { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/reset.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />

export default MyApp
