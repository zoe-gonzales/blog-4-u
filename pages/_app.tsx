import { Session } from "next-auth";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
