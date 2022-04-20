import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getSinglePokemon } from '../../util/database';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

const centerCardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 3rem;
`;
const pokemonCardStyles = css`
  width: 300px;

  background-color: #01397a;
  color: white;
  border: 2px solid black;
  border-radius: 8px;
  padding: 2px 8px 32px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
`;
const imageStyles = css`
  border-radius: 8px;
`;
const counterDivStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15vw;
  gap: 10px;
`;

const counterButtonStyles = css`
  padding: 4px;
  background-color: #787878;
  color: white;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  font-size: 26px;
  border: none;

  cursor: pointer;
  :hover {
    background-color: black;
    transition: ease-out 0.3s;
  }
`;
export const addButtonStyles = css`
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
  }
`;

export const inputStyles = css`
  margin: 2px 8px;
  padding: 4px;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  font-size: 22px;
  text-align: center;
`;
const priceStyles = css`
  display: flex;

  align-items: center;
`;

export type Pokemon = {
  id: number;
  name: string;
  price: number;
  amount: number;
};

type Props = {
  pokemon: Pokemon;
  cart: Pokemon[];
  setAmountInCart: (amount: number) => void;
};

export default function SingleProduct({
  setAmountInCart,

  cart,

  pokemon,
}: Props) {
  const [amount, setAmount] = useState(1);

  const [minAmount, setMinAmount] = useState('');
  const [addedToCart, setAddedToCart] = useState('');

  useEffect(() => {
    const getAmount = () => {
      const pricePokemon = cart.map((product) => {
        return product.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    };

    getAmount();
  }, [cart, setAmountInCart]);

  const handleIncrementAmount = () => {
    setAmount(amount + 1);
    setMinAmount('');
  };
  const handleDecrementAmount = () => {
    if (amount <= 1) {
      setAmount(1);
      setMinAmount('You can only buy one or more pieces of this product');
      return;
    }
    setAmount(amount - 1);
  };

  function handleAddToCookie(id: number) {
    if (amount === 0) {
      setAddedToCart(`Not Possible to add 0 cards!`);
      return;
    }
    if (amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${amount} cards!`);
    }

    const cookieValue: Array = JSON.parse(Cookies.get('cart') || '[]');

    type CookieObject = {
      id: number;
    };

    const existOnArray = cookieValue.some((cookieObject: CookieObject) => {
      return cookieObject.id === id;
    });

    const pokemonInCart = cookieValue.find((cookieObject: CookieObject) => {
      return cookieObject.id === id;
    });
    type Array = [
      {
        id: number;
        amount: number;
        name: string;
      },
    ];

    let newCookie;
    if (existOnArray && pokemonInCart !== undefined) {
      const newAmount: number = amount + pokemonInCart.amount;

      newCookie = [
        ...cookieValue,
        {
          id: pokemon.id,
          amount: newAmount,

          name: pokemon.name,
        },
      ];

      // filter products that are not to be updated, and filter out the old product that is updated
      const cookieUpdated = newCookie.filter(
        (cookieObject) =>
          cookieObject.id !== id ||
          (cookieObject.id === id && cookieObject.amount === newAmount),
      );

      Cookies.set('cart', JSON.stringify(cookieUpdated));

      const pricePokemon = cookieUpdated.map((product) => {
        return product.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    } else {
      newCookie = [
        ...cookieValue,
        {
          id: pokemon.id,
          amount: amount,

          name: pokemon.name,
        },
      ];

      Cookies.set('cart', JSON.stringify(newCookie));

      const pricePokemon = newCookie.map((product) => {
        return product.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    }
  }

  return (
    <>
      <Head>
        <title>{pokemon.name}</title>

        <meta
          name="description"
          content="Single product page, View single product by id"
        />
      </Head>
      {/* <Layout items={amountInCart}> */}
      <div css={centerCardStyles}>
        <h3>{addedToCart}</h3>
        <div css={pokemonCardStyles}>
          <h1>{pokemon.name}</h1>

          <Image
            css={imageStyles}
            src={`/pokemon-images/${pokemon.id}.jpeg`}
            alt={`Picture of ${pokemon.name}`}
            data-test-id="product-image"
            width="250"
            height="250"
          />
          <div css={priceStyles}>
            <h3 data-test-id="product-price"> {pokemon.price} </h3>
            <span> €</span>
          </div>
          <div css={counterDivStyles}>
            <p>{minAmount}</p>
            <div>
              <button
                css={counterButtonStyles}
                onClick={() => {
                  handleDecrementAmount();
                }}
              >
                -
              </button>
              <input
                value={amount}
                min="1"
                type="number"
                css={inputStyles}
                data-test-id="product-quantity"
                onChange={(e) => {
                  setAmount(parseInt(e.currentTarget.value));
                }}
              />
              <button
                css={counterButtonStyles}
                onClick={() => {
                  handleIncrementAmount();
                }}
              >
                +
              </button>{' '}
            </div>
            <button
              css={addButtonStyles}
              data-test-id="product-add-to-cart"
              onClick={() => handleAddToCookie(pokemon.id)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);
  const pokemonId = context.query.pokemonId as string;

  if (typeof pokemonId === 'undefined') {
    return;
  }

  // Only get single pokemon with id from db and store it in variable pokemon
  const pokemon = await getSinglePokemon(parseInt(pokemonId));
  return {
    props: {
      cart: cart,
      pokemon: pokemon,
    },
  };
}
