import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  margin: 1rem 1rem;
  border-radius: 8px;
`;

const formStyles = css`
  background-color: #1668c7;
  padding: 24px;

  color: white;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  margin: 1rem 1rem;
  border-radius: 8px;
`;

const layoutStyles = css`
  margin: 1rem 1rem;
  border-radius: 8px;
`;
const containerCreditCardStyles = css`
  display: flex;
  flex-direction: column;
`;
const smallInputStyles = css`
  width: 50px;
  padding: 8px 8px;
  text-align: center;
  font-size: 16px;
  border: none;
  border-radius: 4px;
`;
const inputStyles = css`
  padding: 8px 8px;

  font-size: 16px;
  border: none;
  border-radius: 4px;
`;
const nameInputStyles = css`
  padding: 8px 8px;

  font-size: 16px;
  border: none;
  border-radius: 4px;
`;
const userNameInfoStyles = css``;
const inputSubmitStyles = css`
  margin-top: 1rem;
  height: 10%;
  padding: 8px 4px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  :hover {
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px,
      rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px,
      rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
    transition: 0.3s ease-out;
  }
`;
export default function Checkout(props) {
  return (
    <Layout css={layoutStyles}>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div css={formContainerStyles}>
        <h1>Checkout</h1>
        <form css={formStyles} action="#" id="survey-form">
          <div css={userNameInfoStyles}>
            <label>
              <h3> First Name </h3>
              <input
                css={nameInputStyles}
                data-test-id="checkout-first-name"
                placeholder="First Name"
              />
            </label>

            <label>
              <h3>E-Mail</h3>
              <input
                css={nameInputStyles}
                type="email"
                data-test-id="checkout-email"
                placeholder="Enter your E-Mail"
              />
            </label>
          </div>
          <div>
            <label>
              <h3>Adress</h3>
              <input
                css={inputStyles}
                type="adress"
                data-test-id="checkout-address"
                placeholder="Adress"
              />
            </label>
            <label>
              <h3>City</h3>
              <input
                css={inputStyles}
                data-test-id="checkout-city"
                placeholder="City"
              />
            </label>
            <label>
              <h3>Postal Code</h3>
              <input
                css={inputStyles}
                data-test-id="checkout-postal-code"
                placeholder="Postal Code"
              />
            </label>
            <label>
              <h3>Country</h3>
              <input
                css={inputStyles}
                data-test-id="checkout-country"
                placeholder="Country"
              />
            </label>
          </div>
          <div css={containerCreditCardStyles}>
            <label>
              <h3>Creditcardnumber</h3>

              <input
                css={inputStyles}
                data-test-id="checkout-credit-card"
                placeholder="1234-5678-9123-4567"
              />
            </label>

            <label>
              <h3>Expiration date</h3>
              <input
                css={smallInputStyles}
                data-test-id="checkout-expiration-date"
                placeholder="exp. date"
              />
            </label>
            <label>
              <h3>Security Number</h3>
              <input
                css={smallInputStyles}
                data-test-id="checkout-security-code"
                placeholder="CVC"
              />
            </label>
          </div>

          <input
            css={inputSubmitStyles}
            data-test-id="checkout-confirm-order"
            type="submit"
            value="Loose your money"
          />
        </form>
      </div>
    </Layout>
  );
}
