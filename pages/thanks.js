import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const headingStyles = css`
  color: white;
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
`;

export default function Thanks() {
  return (
    <Layout>
      <Head>
        <title>Thank you for your order</title>
      </Head>
      <div css={centerHeadingStyles}>
        <h1 css={headingStyles}>Thank you for your purchase</h1>
      </div>
    </Layout>
  );
}
