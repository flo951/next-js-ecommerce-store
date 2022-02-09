import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
import pokemonDatabase from '../util/database';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState } from 'react';

const containerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 2rem;
  justify-content: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

const pokemonCardStyles = css`
  height: 350px;
  width: 250px;
  background-color: #1668c7;
  color: white;
  border: 2px solid black;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  :hover {
    box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px,
      rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px,
      rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px;
    opacity: 1;
    transition: 0.3s ease-in-out;
  }
`;

const centerHeadingStyles = css`
  display: flex;
  justify-content: center;
  h1 {
    color: white;
  }
`;

const imageStyles = css`
  border-radius: 8px;
`;
const layoutStyles = css`
  margin: 1rem 1rem;
`;
export default function Home(props) {
  // const [likedArray, setLikedArray] = useState(props.likedPokemons);

  // function handleAddToCookie(id) {
  //   // 1. get the value of the cookie

  //   const cookieValue = JSON.parse(Cookies.get('likedPokemons') || '[]');
  //   console.log('current value', cookieValue);
  //   // 2. update the cookie
  //   const existOnArray = cookieValue.some((cookieObject) => {
  //     return cookieObject.id === id;
  //   });
  //   let newCookie;
  //   if (existOnArray) {
  //     newCookie = cookieValue.filter((cookieObject) => {
  //       return cookieObject.id !== id;
  //     });
  //   } else {
  //     newCookie = [...cookieValue, { id: id }];
  //   }

  //   // 3. set the new value of the cookie
  //   setLikedArray(newCookie);
  //   Cookies.set('likedPokemons', JSON.stringify(newCookie));
  // }

  return (
    <Layout css={layoutStyles}>
      <Head>
        <title>Products</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div css={centerHeadingStyles}>
        {' '}
        <h1>Available Pokemon Cards</h1>
      </div>
      <div css={containerStyles}>
        {props.pokemonDatabase.map((product) => {
          // const pokemonIsLiked = likedArray.some((likedObject) => {
          //   return likedObject.id === product.id;
          // });

          return (
            <div key={product.id}>
              <Link
                href={`/products/${product.id}`}
                key={'pokemon-' + product.id}
              >
                <a>
                  <div css={pokemonCardStyles}>
                    <h2>{product.name}</h2>
                    <h4>{product.type}</h4>
                    <Image
                      css={imageStyles}
                      src={`/pokemon-images/${product.id}.jpeg`}
                      height="200%"
                      width="200%"
                      alt={product.name}
                    />
                  </div>
                </a>
              </Link>
              {/* <button onClick={() => handleAddToCookie(product.id)}>
                {pokemonIsLiked ? '🧡' : '🖤'}
              </button> */}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
// Code in getserversideprops runs only in node js -> terminal console, you can read files from file system, connect to database
export function getServerSideProps(context) {
  // context allow to acces cookies
  // important, always return an object from getserversideprops and always return a key (props is the key)

  // const likedPokemonsOnCookies = context.req.cookies.likedPokemons || '[]';

  // const likedPokemons = JSON.parse(likedPokemonsOnCookies);
  // // 1. get the cookies from the browser

  // 2. pass the cookies to the frontend

  return {
    props: {
      // likedPokemons: likedPokemons,
      pokemonDatabase: pokemonDatabase,
    },
  };
}
