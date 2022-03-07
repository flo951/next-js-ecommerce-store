import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getSinglePokemon } from '../../util/database';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Layout from '../../components/Layout';

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
  }
`;

const spanStyles = css`
  margin: 2px 8px;
`;

export type Pokemon = {
  id: number;
  name: string;
  price?: number;
  amount: number;
};

type Props = {
  pokemon: Pokemon;
  cart: Pokemon[];
  // amountInCart: any;
  // items: any;
};

export default function SingleProduct(props: Props) {
  const [amount, setAmount] = useState(1);
  const [amountInCart, setAmountInCart] = useState<number>();
  const [minAmount, setMinAmount] = useState('');
  const [addedToCart, setAddedToCart] = useState('');

  useEffect(() => {
    const getAmount = () => {
      const pricePokemon = props.cart.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    };

    getAmount();
  }, [props.cart]);

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

  function handleAddToCookie(id: Number) {
    if (amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${amount} cards!`);
    }

    const cookieValue: Array = JSON.parse(Cookies.get('cart') || '[]');

    type Object = {
      id: number;
    };

    const existOnArray = cookieValue.some((cookieObject: Object) => {
      return cookieObject.id === id;
    });

    const pokemonInCart = cookieValue.find((cookieObject: Object) => {
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
          id: props.pokemon.id,
          amount: newAmount,

          name: props.pokemon.name,
        },
      ];

      // filter products that are not to be updated, and filter out the old product that is updated
      const cookieUpdated = newCookie.filter(
        (cookieObject) =>
          cookieObject.id !== id ||
          (cookieObject.id === id && cookieObject.amount === newAmount),
      );

      Cookies.set('cart', JSON.stringify(cookieUpdated));

      const pricePokemon = cookieUpdated.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    } else {
      newCookie = [
        ...cookieValue,
        {
          id: props.pokemon.id,
          amount: amount,

          name: props.pokemon.name,
        },
      ];

      Cookies.set('cart', JSON.stringify(newCookie));

      const pricePokemon = newCookie.map((pokemon) => {
        return pokemon.amount;
      });

      const sum = pricePokemon.reduce((partialSum, a) => partialSum + a, 0);

      setAmountInCart(sum);
    }
  }

  return (
    <>
      <Head>
        <title>{props.pokemon.name}</title>

        <meta
          name="description"
          content="Single product page, View single product by id"
        />
      </Head>
      <Layout items={amountInCart}>
        <div css={centerCardStyles}>
          <h3>{addedToCart}</h3>
          <div css={pokemonCardStyles}>
            <h1>{props.pokemon.name}</h1>

            <Image
              css={imageStyles}
              src={`/pokemon-images/${props.pokemon.id}.jpeg`}
              alt={`Picture of ${props.pokemon.name}`}
              width="250"
              height="250"
            />

            <h3> {props.pokemon.price} €</h3>
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
                <span css={spanStyles}>{amount}</span>
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
                onClick={() => handleAddToCookie(props.pokemon.id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';

  const cart = JSON.parse(cartOnCookies);
  const pokemonId = context.query.pokemonId;

  // Only get single pokemon with id from db and store it in variable pokemon
  const pokemon = await getSinglePokemon(pokemonId);
  return {
    props: {
      cart: cart,
      pokemon: pokemon,
    },
  };
}
