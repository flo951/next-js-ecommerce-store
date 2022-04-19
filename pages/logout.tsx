import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { serialize } from 'cookie';
import { deleteSessionByToken } from '../util/database';

export default function Logout() {
  return (
    <>
      <Head>
        <title>Logout</title>
        <meta name="login" content="" />
      </Head>

      <h1>Logged out</h1>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const session = await deleteSessionByToken(token);
  if (!session) {
    console.log('something went wrong with the session');
    return;
  }

  if (token) {
    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }
  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
