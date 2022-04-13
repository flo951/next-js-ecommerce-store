import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Pokemon } from '../pages/products/[pokemonId]';

const inputSearchStyles = css`
  padding: 4px 8px;
  font-size: 20px;
`;
const spanStyles = css`
  color: white;
`;

type Props = {
  pokemonsInDb: Pokemon[];
  setPokemonList: (pokemons: Pokemon[]) => void;
};

export default function SearchBar({ pokemonsInDb, setPokemonList }: Props) {
  const [searchBar, setSearchBar] = useState('');
  const [messageNotFound, setMessageNotFound] = useState('');
  const handleChangeSearchbar = (value: string) => {
    const searchValue = value;
    setSearchBar(searchValue);
    setPokemonList(pokemonsInDb);
    setMessageNotFound('');
  };

  useEffect(() => {
    const newPokemonList = pokemonsInDb.filter((pokemon) => {
      return pokemon.name.includes(searchBar);
    });

    newPokemonList.length !== 0 && setPokemonList(newPokemonList);
    if (searchBar.length > 0 && newPokemonList.length === 0) {
      setMessageNotFound('No matching Pokemon found');
    }
  }, [searchBar, setPokemonList, pokemonsInDb]);

  return (
    <div>
      <input
        css={inputSearchStyles}
        value={searchBar}
        placeholder="Search"
        onChange={(e) => {
          handleChangeSearchbar(e.currentTarget.value);
        }}
      />
      <p css={spanStyles}>{messageNotFound}</p>
    </div>
  );
}
