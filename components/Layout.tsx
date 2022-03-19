import Head from 'next/head';

import Header from './Header';

type Props = {
  items: number | undefined;

  children: object;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header items={props.items} />

      <main>{props.children}</main>
    </div>
  );
}
