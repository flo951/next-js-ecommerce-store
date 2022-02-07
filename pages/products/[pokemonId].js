import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import AddToCart from '../../components/AddToCart';
import Counter from '../../components/Counter';
import Layout from '../../components/Layout';
import pokemonDatabase from '../../util/database';

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

export default function SingleProduct(props) {
  return (
    <Layout>
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
        </div>
        <Counter />
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
  return {
    props: {
      pokemon: matchingPokemon,
    },
  };
}
