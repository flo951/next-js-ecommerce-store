import { css } from '@emotion/react';
import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';

const bodyStyles = css``;

type Props = {
  items: object;
  children: object;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header items={props.items} />

      <main css={bodyStyles}>{props.children}</main>
      <Footer />
    </div>
  );
}
