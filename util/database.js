import postgres from 'postgres';
import { config } from 'dotenv-safe';
// use camelcaseKeys for names with z.B. first_name to convert it automatically for js to firstName
// Read environment variables from .env, which will then bei available for all following code
config();

// connect to database
const sql = postgres();

export async function getPokemons() {
  const pokemons = await sql`
SELECT * FROM pokemons;


`;
  return pokemons;
}

export async function getSinglePokemon(id) {
  const [pokemon] = await sql`
  --still an array
  SELECT * FROM pokemons WHERE id = ${id};


`;
  return pokemon;
}

// const pokemonDatabase = [
//   { id: '1', name: 'Glumanda', price: 500 },
//   { id: '2', name: 'Bisasam', price: 500 },
//   { id: '3', name: 'Shiggy', price: 500 },
//   { id: '4', name: 'Relaxo', price: 500 },
//   { id: '5', name: 'Pickachu', price: 500 },
//   { id: '6', name: 'Mew', price: 500 },
//   { id: '7', name: 'Mewto', price: 500 },
//   { id: '8', name: 'Garados', price: 500 },
// ];

// export default pokemonDatabase;
