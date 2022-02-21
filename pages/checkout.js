import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getPokemons } from '../util/database';
import Cookies from 'js-cookie';
import Router from 'next/router';

const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 1rem 1rem;
  border-radius: 8px;
`;

const formStyles = css`
  background-color: #01397a;
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
  margin-top: 48px;
  padding: 16px 8px;
  background-color: #787878;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    box-shadow: rgba(240, 46, 170, 0.4) 0px 5px,
      rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px,
      rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
  }
`;
export default function Checkout(props) {
  const [amountInCart, setAmountInCart] = useState(props.cart);
  useEffect(() => {
    const getAmount = () => {
      console.log(props.cart);
      const pricePokemon = props.cart.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    };

    getAmount();
  }, []);

  const deleteCookie = (e) => {
    e.preventDefault();
    Cookies.remove('cart');
    // use next router to redirect after submitting form
    Router.push('./thanks').catch();
  };

  console.log(props);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="Checkout" content="Form to complete payment process" />
      </Head>
      <Layout>
        <div css={formContainerStyles}>
          <h1>Checkout</h1>
          <form css={formStyles} id="survey-form" onSubmit={deleteCookie}>
            <div css={userNameInfoStyles}>
              <label htmlFor="first-name">
                <h4> First Name </h4>
              </label>
              <input
                css={nameInputStyles}
                data-test-id="checkout-first-name"
                id="first-name"
                name="first-name"
                placeholder="First Name"
                required
              />
              <label htmlFor="last-name">
                <h4> Last Name </h4>
              </label>
              <input
                css={nameInputStyles}
                data-test-id="checkout-last-name"
                id="last-name"
                name="last-name"
                placeholder="Last Name"
                required
              />

              <label htmlFor="e-mail">
                <h4>E-Mail</h4>{' '}
              </label>
              <input
                css={nameInputStyles}
                type="email"
                data-test-id="checkout-email"
                placeholder="Enter your E-Mail"
                required
              />
            </div>
            <div>
              <label>
                <h4>Adress</h4>
                <input
                  css={inputStyles}
                  type="adress"
                  data-test-id="checkout-address"
                  placeholder="Adress"
                  required
                />
              </label>
              <label>
                <h4>City</h4>
                <input
                  css={inputStyles}
                  data-test-id="checkout-city"
                  placeholder="City"
                  required
                />
              </label>
              <label htmlFor="postal-code">
                <h4>Postal Code</h4>
              </label>
              <input
                css={inputStyles}
                id="postal-code"
                name="postal-code"
                data-test-id="checkout-postal-code"
                placeholder="Postal Code"
                required
              />

              {/* <label for="cheese">Do you like cheese?</label>
              <input type="checkbox" name="cheese" id="cheese"> */}
              <label>
                <h4>Country</h4>
                <input
                  css={inputStyles}
                  data-test-id="checkout-country"
                  placeholder="Country"
                  required
                />
              </label>
            </div>
            <div css={containerCreditCardStyles}>
              <label>
                <h4>Creditcardnumber</h4>

                <input
                  css={inputStyles}
                  data-test-id="checkout-credit-card"
                  placeholder="1234-5678-9123-4567"
                  required
                />
              </label>

              <label>
                <h4>Expiration date</h4>
                <input
                  css={smallInputStyles}
                  data-test-id="checkout-expiration-date"
                  placeholder="exp. date"
                  required
                />
              </label>
              <label>
                <h4>Security Number</h4>
                <input
                  css={smallInputStyles}
                  data-test-id="checkout-security-code"
                  placeholder="CVC"
                  required
                />
              </label>
              <input
                css={inputSubmitStyles}
                data-test-id="checkout-confirm-order"
                type="submit"
                value="complete order, really no scam"
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend
  const pokemonsInDb = await getPokemons();
  return {
    props: {
      cart: cart,
      pokemonsInDb,
    },
  };
}
