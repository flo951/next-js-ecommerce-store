import Head from 'next/head';
import { useState } from 'react';
import { errorStyles } from './register';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { inputStyles } from './checkout';
import { LoginResponseBody } from './api/login';

export const formStyles = css`
  background-color: #01397a;
  padding: 24px;

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin: 1rem 1rem;
  border-radius: 8px;
`;
export const inputSubmitStyles = css`
  padding: 8px 4px;
  width: 25%;
  background-color: #787878;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  color: white;
`;

export type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
};
export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  const storage = globalThis.sessionStorage;

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
            const loginResponse = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });

            const loginResponseBody =
              (await loginResponse.json()) as LoginResponseBody;

            if ('errors' in loginResponseBody) {
              setErrors(loginResponseBody.errors);
              return;
            }
            // get the query paramaeter from next.js router
            const returnTo = router.query.returnTo;
            if (
              returnTo &&
              !Array.isArray(returnTo) &&
              // match returnto paramater against valid path
              // regexpressions
              /^\/[a-zA-Z0-9-?=]*$/.test(returnTo)
            ) {
              await router.push(returnTo);
              return;
            }

            await router.push(storage.prevPath);

            props.refreshUserProfile();
            setUsername('');
            setPassword('');
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
          <input type="submit" value="Login" css={inputSubmitStyles} />
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
