import { css } from '@emotion/react';
import Head from 'next/head';

import Header from './Header';

const bodyStyles = css``;

type Props = {
  items: any;
  children: object;
  // setAmountInCart: any;
  // pokemon: Pokemon;
  // likedPokemons: Pokemon[];
};

export default function Layout(props: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header items={props.items} />

      <main css={bodyStyles}>{props.children}</main>
    </div>
  );
}
