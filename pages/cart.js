import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useState } from 'react';

const containerStyles = css`
  color: white;
`;

const itemsInCartStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3rem;
  margin-bottom: 2rem;
  justify-content: center;
  color: white;
`;
const imageStyles = css`
  border-radius: 8px;
`;
const miniCardStyles = css`
  background-color: #01397a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  min-width: 15vw;
`;
const addButtonStyles = css`
  margin-top: 8px;
  padding: 16px 8px;
  background-color: #01397a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    box-shadow: rgba(240, 46, 170, 0.4) 0px 5px,
      rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px,
      rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
  }
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #297cdb;
  color: white;
  border-radius: 8px;

  font-size: 18px;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: rgba(240, 46, 170, 0.4) 0px 5px,
      rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px,
      rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px;
    transition: ease-out 0.3s;
  }
`;

export default function Cart(props) {
  const [pokemonsInCart, setPokemonsInCart] = useState(props.likedPokemons);

  let priceSum = 0;
  props.likedPokemons.forEach(function (element) {
    priceSum += element.price;
  });

  let amountSum = 0;
  props.likedPokemons.forEach(function (element) {
    amountSum += element.amount;
  });

  function handleDeleteCookie(id) {
    const newCookie = pokemonsInCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });
    console.log(newCookie);

    setPokemonsInCart(newCookie);
    Cookies.set('likedPokemons', JSON.stringify(newCookie));

    priceSum = newCookie.forEach(function (element) {
      priceSum += element.price;
    });

    amountSum = newCookie.forEach(function (element) {
      amountSum += element.amount;
    });
  }

  return (
    <Layout>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
      </Head>
      <div css={containerStyles}>
        <div css={itemsInCartStyles} data-test-id="cart-product-product id">
          {pokemonsInCart.map((pokemon) => {
            return (
              <div css={miniCardStyles} key={`pokemon-${pokemon.id}`}>
                <h1>{pokemon.name}</h1>
                <Image
                  css={imageStyles}
                  src={`/pokemon-images/${pokemon.id}.jpeg`}
                  alt={pokemon.name}
                  width="75"
                  height="75"
                />

                <h3> {pokemon.price} €</h3>

                <span> Amount: {pokemon.amount}</span>

                <button
                  css={counterButtonStyles}
                  onClick={() => {
                    handleDeleteCookie(pokemon.id);
                  }}
                  data-test-id="cart-product-remove-<product id>"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <h2 data-test-id="cart-total">Total: {priceSum} €</h2>
          <span>for {amountSum} Cards</span>
          <Link href="/checkout">
            <a>
              <button css={addButtonStyles} data-test-id="cart-checkout">
                Checkout
              </button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend

  return {
    props: {
      likedPokemons: likedPokemons,
    },
  };
}
