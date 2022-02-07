import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const containerStyles = css`
  color: white;
`;

export default function Cart() {
  return (
    <Layout>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
      </Head>
      <div css={containerStyles}>
        <h1>Your Cart</h1>
        <div data-test-id="cart-product-product id">
          <span>Product name</span>
          <span>Product price</span>
          <button data-test-id="cart-product-remove-<product id>">
            Remove
          </button>
        </div>
        <button data-test-id="cart-checkout">Checkout</button>
      </div>
    </Layout>
  );
}
