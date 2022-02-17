export function updateAmount(id, value, pokemonArray) {
  let newCookie = [];

  const pokemonInCart = pokemonArray.find((cookieObject) => {
    return cookieObject.id === id;
  });

  const newAmount = value + pokemonInCart.amount;

  newCookie = [
    ...pokemonArray,
    {
      id: pokemonInCart.id,
      amount: newAmount,

      name: pokemonInCart.name,
    },
  ];
  const cookieUpdated = newCookie.filter(
    (cookieObject) =>
      cookieObject.id !== id ||
      (cookieObject.id === id) & (cookieObject.amount === newAmount),
  );

  return cookieUpdated;
}

export const getAmount = (pokemonsInCart) => {
  const amountPokemon = pokemonsInCart.map((pokemon) => {
    return pokemon.amount;
  });

  const sum = amountPokemon.reduce((partialSum, a) => partialSum + a, 0);

  return sum;
};

export function handleDeleteCookie(id, pokemonsInCart) {
  const newCookie = pokemonsInCart.filter((cookieObject) => {
    return cookieObject.id !== id;
  });

  return newCookie;
}

export function handleAddToCookie(id, amount, name, pokemonsInCart) {
  const newCookie = [
    ...pokemonsInCart,
    {
      id: id,
      amount: amount,
      name: name,
    },
  ];

  return newCookie;
}
