import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  const [amountInCart, setAmountInCart] = useState(0);
  const [pokemonsInCart, setpokemonsInCart] = useState(pageProps.likedPokemons);

  console.log(amountInCart);

  useEffect(() => {
    const getAmount = () => {
      let sum = 0;
      pokemonsInCart.forEach((element) => {
        sum += element.amount;
      });

      setAmountInCart(sum);
    };

    getAmount();
  }, [amountInCart, pokemonsInCart]);

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
          }
        `}
      />
      <Layout items={amountInCart}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
