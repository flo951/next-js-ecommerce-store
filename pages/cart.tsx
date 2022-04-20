import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Pokemon } from './products/[pokemonId]';
import { GetServerSidePropsContext } from 'next';
import {
  getPokemons,
  getUserByValidSessionToken,
  User,
} from '../util/database';

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

export type Props = {
  user?: User;
  pokemonsInDb: Pokemon[];
  cart: Pokemon[];
  setAmountInCart: (amount: number) => void;
  amountInCart: number;
  error: [{ message: string }];
};
export default function Cart(props: Props) {
  const [pokemonsInCart, setPokemonsInCart] = useState(props.cart);
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    const getAmount = () => {
      const amountPokemon = pokemonsInCart.map((pokemon: Pokemon) => {
        return pokemon.amount;
      });

      const sum = amountPokemon.reduce(
        (partialSum: number, a: number) => partialSum + a,
        0,
      );

      props.setAmountInCart(sum);

      const pricePokemon = pokemonsInCart.map((pokemon: Pokemon) => {
        return props.pokemonsInDb[pokemon.id - 1].price * pokemon.amount;
      });

      const sumPrice = pricePokemon.reduce(
        (partialSum: number, a: number) => partialSum + a,
        0,
      );

      setNewPrice(sumPrice);
    };

    getAmount();
  }, [pokemonsInCart, props]);

  function handleDeleteProductInCookie(id: number) {
    // filter products with different id than product to delete and return them
    const newCookie = pokemonsInCart.filter((cookieObject: Pokemon) => {
      return cookieObject.id !== id;
    });

    setPokemonsInCart(newCookie);
    Cookies.set('cart', JSON.stringify(newCookie));

    const amountPokemon = newCookie.map((pokemon: Pokemon) => {
      return pokemon.amount;
    });

    const sum = amountPokemon.reduce(
      (partialSum: number, a: number) => partialSum + a,
      0,
    );
    props.setAmountInCart(sum);

    const pricePokemon = newCookie.map((pokemon: Pokemon) => {
      return props.pokemonsInDb[pokemon.id - 1].price * pokemon.amount;
    });

    const sumPrice = pricePokemon.reduce(
      (partialSum: number, a: number) => partialSum + a,
      0,
    );

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
      {/* <Layout items={amount}> */}
      <div css={containerStyles}>
        <div css={itemsInCartStyles}>
          {pokemonsInCart.map((pokemon: Pokemon) => {
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
            <span> € {props.amountInCart} </span>
            <span>{props.amountInCart > 1 ? 'Cards' : 'Card'}</span>
          </div>
          {props.user ? (
            <button
              onClick={() =>
                Router.push('./checkout').catch((error) => console.log(error))
              }
              css={addButtonStyles}
              data-test-id="cart-checkout"
            >
              Checkout
            </button>
          ) : (
            <span>{props.error}</span>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart: Pokemon[] = JSON.parse(cartOnCookies);
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);
  const pokemonsInDb = await getPokemons();

  if (!user) {
    return {
      props: {
        cart: cart,
        pokemonsInDb: pokemonsInDb,
        error: 'Please login before checking out',
      },
    };
  }

  return {
    props: {
      cart: cart,
      pokemonsInDb: pokemonsInDb,
      user: user,
    },
  };
}
