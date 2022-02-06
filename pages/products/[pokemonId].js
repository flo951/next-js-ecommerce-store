import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Counter from '../../components/Counter';
import Layout from '../../components/Layout';
import pokemonDatabase from '../../util/database';
export default function SingleProduct(props) {
  return (
    <Layout>
      <Head>
        <title>{props.pokemon.name}</title>
      </Head>
      <h1>{props.pokemon.name}</h1>
      <div>
        <Image
          src={`/pokemon-images/${props.pokemon.id}.jpeg`}
          alt={props.pokemon.name}
          width="300"
          height="300"
        />
      </div>
      <Counter />
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
