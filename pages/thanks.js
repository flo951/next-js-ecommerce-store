import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getPokemons } from '../util/database';

const headingStyles = css`
  color: white;
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
`;

export default function Thanks(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
      </Head>
      <div css={centerHeadingStyles}>
        <h1 css={headingStyles}>Thank you for your purchase</h1>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend
  const pokemonsInDb = await getPokemons();
  return {
    props: {
      likedPokemons: likedPokemons,
      pokemonsInDb,
    },
  };
}
