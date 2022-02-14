import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getSinglePokemon } from '../../util/database';
import Cookies from 'js-cookie';

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
  background-color: #939994;
  color: white;
  border-radius: 8px;
  height: 40px;
  width: 40px;
  font-size: 26px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #297cdb;
    transition: ease-out 0.3s;
  }
`;
const addButtonStyles = css`
  margin-top: 8px;
  padding: 16px 8px;
  background-color: #939994;
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

const spanStyles = css`
  margin: 2px 8px;
`;

export default function SingleProduct(props) {
  const [likedArray, setLikedArray] = useState(props.likedPokemons);
  const [amount, setAmount] = useState(1);
  const [minAmount, setMinAmount] = useState('');
  const [addedToCart, setAddedToCart] = useState('');

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

  function handleAddToCookie(id) {
    if (amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${amount} cards!`);
    }

    const cookieValue = JSON.parse(Cookies.get('likedPokemons') || '[]');

    const existOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    const pokemonInCart = cookieValue.find((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existOnArray) {
      const newAmount = amount + pokemonInCart.amount;

      newCookie = [
        ...cookieValue,
        {
          id: id,
          amount: newAmount,
          price: props.pokemon.price * newAmount,
          name: props.pokemon.name,
        },
      ];
      // filter products that are not to be updated, and filter out the old product that is updated
      const cookieUpdated = newCookie.filter(
        (cookieObject) =>
          cookieObject.id !== id ||
          (cookieObject.id === id) & (cookieObject.amount === newAmount),
      );

      setLikedArray(cookieUpdated);
      Cookies.set('likedPokemons', JSON.stringify(cookieUpdated));
    } else {
      newCookie = [
        ...cookieValue,
        {
          id: id,
          amount: amount,
          price: props.pokemon.price * amount,
          name: props.pokemon.name,
        },
      ];
      // 3. set the new value of the cookie
      setLikedArray(newCookie);
      Cookies.set('likedPokemons', JSON.stringify(newCookie));
    }
  }
  const pokemonIsLiked = likedArray.some((likedObject) => {
    return likedObject.id === props.pokemon.id;
  });

  // let sum = 0;
  // likedArray.forEach(function (element) {
  //   sum += element.amount;
  // });

  return (
    <>
      <Head>
        <title>{props.pokemon.name}</title>
      </Head>

      <div css={centerCardStyles}>
        <h3>{addedToCart}</h3>
        <div css={pokemonCardStyles}>
          <h1>{props.pokemon.name}</h1>

          <Image
            css={imageStyles}
            src={`/pokemon-images/${props.pokemon.id}.jpeg`}
            alt={props.pokemon.name}
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
    </>
  );
}

export async function getServerSideProps(context) {
  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  const pokemonId = context.query.pokemonId;

  // Only get single pokemon with id from db and store it in variable pokemon
  const pokemon = await getSinglePokemon(pokemonId);
  return {
    props: {
      likedPokemons: likedPokemons,
      pokemon: pokemon,
    },
  };
}
