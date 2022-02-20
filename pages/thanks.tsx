import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { getPokemons } from '../util/database';

const headingStyles = css`
  color: white;
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
`;

export default function Thanks() {
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
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);

  // Only get single pokemon with id from db and store it in variable pokemon
  const pokemons = await getPokemons();
  return {
    props: {
      likedPokemons: likedPokemons,
      pokemons: pokemons,
    },
  };
}
