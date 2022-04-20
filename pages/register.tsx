import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';
import { inputStyles } from './checkout';
import { Errors, formStyles, inputSubmitStyles } from './login';

export const errorStyles = css`
  color: white;
`;
type Props = {
  refreshUserProfile: () => void;
};
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const registerResponse = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            const registerResponseBody =
              (await registerResponse.json()) as RegisterResponseBody;

            if ('errors' in registerResponseBody) {
              setErrors(registerResponseBody.errors);
              return;
            }

            props.refreshUserProfile();
            setUsername('');
            setPassword('');
            await router.push('/');
          }}
          css={formStyles}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            placeholder="username"
            css={inputStyles}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            placeholder="password"
            css={inputStyles}
          />
          <input type="submit" value="Register" css={inputSubmitStyles} />
          <div css={errorStyles}>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </form>
      </main>
    </div>
  );
}
