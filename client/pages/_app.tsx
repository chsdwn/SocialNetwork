import { AppProps } from 'next/app';

import 'semantic-ui-css/semantic.min.css';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
