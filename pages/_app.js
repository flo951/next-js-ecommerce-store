import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  const [amountInCart, setAmountInCart] = useState(0);
  const [pokemonsInCart, setPokemonsInCart] = useState(pageProps.likedPokemons);

  // map over pokemons incart, return amount for every id. then foreach
  console.log(pageProps);

  useEffect(() => {
    const getAmount = () => {
      const amountPokemon = pokemonsInCart.map((pokemon) => {
        return pokemon.amount;
      });
      console.log(amountPokemon);

      const sum = amountPokemon.reduce((partialSum, a) => partialSum + a, 0);
      setAmountInCart(sum);
    };

    getAmount();
  }, [pokemonsInCart]);

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
