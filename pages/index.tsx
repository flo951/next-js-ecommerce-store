import Head from 'next/head';
import Image from 'next/image';
import { css } from '@emotion/react';
import { getPokemons } from '../util/database';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Props } from './cart';

const containerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 2rem;
  justify-content: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

const pokemonCardStyles = css`
  height: 350px;
  width: 250px;
  background-color: #01397a;
  color: white;
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  :hover {
    box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px,
      rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px,
      rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
  h1 {
    color: white;
  }
`;
const searchBarStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
`;

const imageStyles = css`
  border-radius: 8px;
`;

export default function Home(props: Props) {
  const [pokemonList, setPokemonList] = useState(props.pokemonsInDb);
  // const [searchBar, setSearchBar] = useState('');

  useEffect(() => {
    const getAmount = () => {
      const pricePokemon = props.cart.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      props.setAmountInCart(sum);
    };

    getAmount();
  }, [props]);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta
          name="description"
          content="Products Home Page, see which Pokemon cards you can buy"
        />
      </Head>

      <div css={centerHeadingStyles}>
        <h1>Available Pokemon Cards</h1>
      </div>
      <div css={searchBarStyles}>
        <SearchBar
          pokemonsInDb={props.pokemonsInDb}
          setPokemonList={setPokemonList}
        />
      </div>
      <div css={containerStyles}>
        {pokemonList.map((product) => {
          return (
            <Link
              href={`/products/${product.id}`}
              key={'pokemon-' + product.id}
            >
              <a data-test-id={`product-${product.id}`}>
                <div css={pokemonCardStyles}>
                  <h2>{product.name}</h2>

                  <Image
                    css={imageStyles}
                    src={`/pokemon-images/${product.id}.jpeg`}
                    height="200%"
                    width="200%"
                    alt={`Image of Pokemon ${product.name}`}
                  />
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      {/* </Layout> */}
    </>
  );
}
// Code in getserversideprops runs only in node js -> terminal console, you can read files from file system, connect to database
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);

  const pokemonsInDb = await getPokemons();

  return {
    props: {
      cart: cart,
      pokemonsInDb,
    },
  };
}
