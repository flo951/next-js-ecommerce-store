import Head from 'next/head';
import { User } from '../util/database';
import Header from './Header';

type Props = {
  amountInCart: number | undefined;
  userObject: User | undefined;
  children: object;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header items={props.amountInCart} userObject={props.userObject} />

      <main>{props.children}</main>
    </div>
  );
}
