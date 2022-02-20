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
const checkoutStyles = css`
  display: flex;
  flex-direction: column;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;
export default function Cart(props) {
  const [pokemonsInCart, setPokemonsInCart] = useState(props.likedPokemons);
  const [newPrice, setNewPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  console.log(props);
  useEffect(() => {
    const getAmount = () => {
      console.log(props.likedPokemons);
      const pricePokemon = props.likedPokemons.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmount(sum);
    };

    getAmount();
  }, []);

  let priceSum = 0;
  props.likedPokemons.forEach(function (element) {
    priceSum += props.pokemonsInDb[element.id - 1].price * element.amount;
  });

  let amountSum = 0;
  props.likedPokemons.forEach(function (element) {
    amountSum += element.amount;
  });

  function handleDeleteCookie(id) {
    // filter products with different id than product to delete and return them
    const newCookie = pokemonsInCart.filter((cookieObject) => {
      return cookieObject.id !== id;
    });

    setPokemonsInCart(newCookie);
    Cookies.set('likedPokemons', JSON.stringify(newCookie));

    amountSum = newCookie.forEach(function (element) {
      amountSum += element.amount;
    });

    const amountPokemon = newCookie.map((pokemon) => {
      return pokemon.amount;
    });
    console.log(amountPokemon);

    const sum = amountPokemon.reduce((partialSum, a) => partialSum + a, 0);
    setAmount(sum);
  }

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart" />
      </Head>
      <Layout items={amount}>
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
                  {console.log(props.pokemonsInDb[pokemon.id - 1].price)}
                  <h3>
                    {/* {props.pokemonsInDb[pokemon.id - 1].price * pokemon.amount} € */}
                    {pokemon.amount < 0
                      ? handleDeleteCookie(pokemon.id)
                      : props.pokemonsInDb[pokemon.id - 1].price *
                        pokemon.amount}
                  </h3>

                  <span> Amount: {pokemon.amount}</span>

                  <button
                    css={counterButtonStyles}
                    onClick={() => {
                      handleDeleteCookie(pokemon.id);
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
            {/* <h2 data-test-id="cart-total">
            Total: {priceSum}€ for {amountSum} Cards
          </h2> */}

            <button
              onClick={() => Router.push('./checkout')}
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

  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend
  const pokemonsInDb = await getPokemons();
  return {
    props: {
      likedPokemons: likedPokemons,
      pokemonsInDb,
    },
  };
}
