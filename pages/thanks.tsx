import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
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

export default function Thanks() {
  return (
    <>
      <Head>
        <title>Thank you for your order</title>

        <meta name="description" content="Thank you message" />
      </Head>
      {/* <Layout items={0}> */}
      <div css={centerHeadingStyles}>
        <h1 css={headingStyles}>Thank you for your order</h1>
      </div>
      {/* </Layout> */}
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);

  // Only get single pokemon with id from db and store it in variable pokemon
  const pokemons = await getPokemons();
  return {
    props: {
      cart: cart,
      pokemons: pokemons,
    },
  };
}
