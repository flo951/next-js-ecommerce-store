import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const registerResponse = fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            props.refreshUserProfile();
            setUsername('');
            setPassword('');
          }}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            placeholder="password"
          />
          <input type="submit" />
        </form>
      </main>
    </div>
  );
}
