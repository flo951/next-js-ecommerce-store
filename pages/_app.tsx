import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  const [amountInCart, setAmountInCart] = useState<number>(0);
  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  const router = useRouter();

  useEffect(() => {
    storePathValues();
  }, [router.asPath]);

  function storePathValues() {
    const storage = globalThis.sessionStorage;

    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    if (!prevPath) {
      return;
    }
    storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);
  }

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background-color: black;
            min-height: 100vh;
          }
        `}
      />
      <Layout userObject={user} amountInCart={amountInCart}>
        <Component
          refreshUserProfile={refreshUserProfile}
          {...pageProps}
          setAmountInCart={setAmountInCart}
          amountInCart={amountInCart}
        />
      </Layout>
    </>
  );
}
