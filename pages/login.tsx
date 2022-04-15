import Head from 'next/head';
import Header from '../components/Header';

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <input placeholder="username" />
        <input placeholder="password" />
      </main>
    </div>
  );
}
