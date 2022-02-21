import {
  handleAddToCookie,
  updateAmount,
  getAmount,
  handleDeleteCookie,
} from './cookieFunctions.js';

const pokemons = [
  { id: 1, amount: 2, name: 'Glumanda' },
  { id: 2, amount: 2, name: 'Bisasam' },
];

test('sum pokemons in cart', () => {
  expect(getAmount(pokemons)).toBe(4);
});

test('update amount of in cookie when adding same product', () => {
  const updatePokemons = [
    { id: 2, amount: 2, name: 'Bisasam' },
    { id: 1, amount: 6, name: 'Glumanda' },
  ];
  expect(updateAmount(1, 4, pokemons)).toStrictEqual(updatePokemons);
});

test('delete pokemon with id 1', () => {
  const deletePokemons = [{ id: 2, amount: 2, name: 'Bisasam' }];
  expect(handleDeleteCookie(1, pokemons)).toStrictEqual(deletePokemons);
});

test('add pokemon with id 1', () => {
  const deletePokemons = [{ id: 1, amount: 2, name: 'Glumanda' }];
  expect(handleAddToCookie(2, 2, 'Bisasam', deletePokemons)).toStrictEqual(
    pokemons,
  );
});
