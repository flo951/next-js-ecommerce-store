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
  id: number;
  username: string;
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
type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`

  DELETE FROM
  sessions
  WHERE
  expiry_timestamp < NOW()
  RETURNING *
  `;

  return sessions.map((session: Session) => camelcaseKeys(session));
}
export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`

  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING id, token
  `;
  await deleteExpiredSessions();
  return camelcaseKeys(session);
}
export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;

  const [user] = await sql<[User | undefined]>`
  SELECT users.id ,
  users.username
   FROM users,
   sessions WHERE sessions.token = ${token}
    AND sessions.user_id = users.id
     AND expiry_timestamp > now()



  `;
  return user && camelcaseKeys(user);
}

export type UserWithPasswordHash = User & { passwordHash: string };
export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT id, username, password_hash FROM users WHERE username = ${username}
 `;
  return user && camelcaseKeys(user);
}
export async function deleteSessionByToken(token: string) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`

  DELETE FROM
  sessions
  WHERE
  token = ${token}
  RETURNING *
  `;

  return session && camelcaseKeys(session);
}
