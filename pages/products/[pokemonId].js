import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import pokemonDatabase from '../../util/database';
import Cookies from 'js-cookie';

const centerCardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const pokemonCardStyles = css`
  width: 300px;

  background-color: #1668c7;
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
  background-color: #01397a;
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

  function handleAddToCart() {
    if (amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${amount} cards!`);
    }
  }

  function handleAddToCookie(id) {
    // 1. get the value of the cookie
    if (amount === 1) {
      setAddedToCart(`You added one card!`);
    } else {
      setAddedToCart(`You added ${amount} cards!`);
    }

    const cookieValue = JSON.parse(Cookies.get('likedPokemons') || '[]');
    //console.log('current value', cookieValue);
    // 2. update the cookie
    const existOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });
    let newCookie;
    if (existOnArray) {
      newCookie = cookieValue.filter((cookieObject) => {
        return cookieObject.id !== id;
      });
    } else {
      newCookie = [
        ...cookieValue,
        { id: id, amount: amount, price: props.pokemon.price * amount },
      ];
    }

    // 3. set the new value of the cookie
    setLikedArray(newCookie);
    Cookies.set('likedPokemons', JSON.stringify(newCookie));
  }
  const pokemonIsLiked = likedArray.some((likedObject) => {
    return likedObject.id === props.pokemon.id;
  });

  let sum = 0;
  likedArray.forEach(function (element) {
    sum += element.amount;
  });

  console.log(sum);

  return (
    <Layout items={sum}>
      <Head>
        <title>{props.pokemon.name}</title>
      </Head>
      <div css={centerCardStyles}>
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
          <h3> {likedArray.length}</h3>
        </div>
        <p>{minAmount}</p>
        <div css={counterDivStyles}>
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

          <p>{addedToCart}</p>
        </div>

        <button onClick={() => handleAddToCookie(props.pokemon.id)}>
          {pokemonIsLiked ? '🧡' : '🖤'}
        </button>
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  // this is the variable we get from url
  const pokemonId = context.query.pokemonId;
  console.log('database joooo', pokemonDatabase);
  const matchingPokemon = pokemonDatabase.find((pokemon) => {
    // eslint-disable-next-line sonarjs/prefer-single-boolean-return
    if (pokemon.id === pokemonId) {
      return true;
    } else {
      return false;
    }
  });
  const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  return {
    props: {
      likedPokemons: likedPokemons,
      pokemon: matchingPokemon,
      pokemonDatabase: pokemonDatabase,
    },
  };
}
