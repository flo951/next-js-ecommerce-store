import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { getPokemons } from '../util/database';
import Layout from '../components/Layout';
import Router from 'next/router';

const containerStyles = css`
  color: white;
`;

const itemsInCartStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0rem 2rem;
  gap: 3rem;
  margin-bottom: 2rem;

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
  background-color: #787878;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;

  :hover {
    transition: ease-out 0.3s;
    background-color: black;
    border: 2px solid white;
  }
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #787878;
  color: white;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: black;
  }
`;
const checkoutStyles = css`
  display: flex;
  flex-direction: column;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;
export default function Cart(props) {
  const [pokemonsInCart, setPokemonsInCart] = useState(props.cart);
  const [newPrice, setNewPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getAmount = () => {
      const amountPokemon = pokemonsInCart.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = amountPokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmount(sum);

      const pricePokemon = pokemonsInCart.map((pokemon) => {
        return props.pokemonsInDb[pokemon.id - 1].price * pokemon.amount;
      });

      const sumPrice = pricePokemon.reduce(
        (partialSum, a) => partialSum + a,
        0,
      );

      setNewPrice(sumPrice);
    };

    getAmount();
  }, [pokemonsInCart, props]);

  function handleDeleteProductInCookie(id) {
    // filter products with different id than product to delete and return them
    const newCookie = pokemonsInCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });

    setPokemonsInCart(newCookie);
    Cookies.set('cart', JSON.stringify(newCookie));

    const amountPokemon = newCookie.map((pokemon) => {
      return pokemon.amount;
    });

    const sum = amountPokemon.reduce((partialSum, a) => partialSum + a, 0);
    setAmount(sum);

    const pricePokemon = newCookie.map((pokemon) => {
      return props.pokemonsInDb[pokemon.id - 1].price * pokemon.amount;
    });

    const sumPrice = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

    setNewPrice(sumPrice);
  }

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="This is the Cart page, see your Products in the cart"
        />
      </Head>
      <Layout items={amount}>
        <div css={containerStyles}>
          <div css={itemsInCartStyles}>
            {pokemonsInCart.map((pokemon) => {
              return (
                <div
                  css={miniCardStyles}
                  key={`pokemon-${pokemon.id}`}
                  data-test-id={`cart-product-${pokemon.id}`}
                >
                  <h1>{pokemon.name}</h1>
                  <Image
                    css={imageStyles}
                    src={`/pokemon-images/${pokemon.id}.jpeg`}
                    alt={pokemon.name}
                    width="75"
                    height="75"
                  />

                  <h3>
                    {pokemon.amount < 0
                      ? handleDeleteProductInCookie(pokemon.id)
                      : props.pokemonsInDb[pokemon.id - 1].price *
                        pokemon.amount}{' '}
                    €
                  </h3>
                  <div>
                    <span>Amount: </span>
                    <span data-test-id={`cart-product-quantity-${pokemon.id}`}>
                      {pokemon.amount}
                    </span>
                  </div>
                  <button
                    css={counterButtonStyles}
                    onClick={() => {
                      handleDeleteProductInCookie(pokemon.id);
                    }}
                    data-test-id={`cart-product-remove-${pokemon.id}`}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div css={checkoutStyles}>
            <div>
              <span>Total: </span>
              <span data-test-id="cart-total">{newPrice}</span>
              <span> € {amount} </span>
              <span>{amount > 1 ? 'Cards' : 'Card'}</span>
            </div>
            <button
              onClick={() =>
                Router.push('./checkout').catch((error) => console.log(error))
              }
              css={addButtonStyles}
              data-test-id="cart-checkout"
            >
              Checkout
            </button>
          </div>
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
