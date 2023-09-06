// _app.tsx
import '../styles/global/global.css';
import '../styles/global/fonts.css';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;