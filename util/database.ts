import postgres from 'postgres';
import { config } from 'dotenv-safe';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';
import { Pokemon } from '../pages/products/[pokemonId].jsx';
import camelcaseKeys from 'camelcase-keys';

setPostgresDefaultsOnHeroku();
config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// connect to database
const sql = connectOneTimeToDatabase();

export async function getPokemons() {
  const pokemons = await sql<Pokemon[]>`
SELECT * FROM pokemons;


`;
  return pokemons;
}

export async function getSinglePokemon(id: number) {
  const [pokemon] = await sql<[Pokemon]>`

  SELECT * FROM pokemons WHERE id = ${id};


`;
  return pokemon;
}

export type User = {
  username: string;
  password: string;
};
export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
INSERT INTO  users (username, password_hash) VALUES (${username}, ${passwordHash})
RETURNING id, username


`;
  return camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
    SELECT id FROM users WHERE username = ${username}
 `;
  return user && camelcaseKeys(user);
}
