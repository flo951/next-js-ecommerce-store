const pokemons = [
  { name: 'Glumanda', price: 500 },
  { name: 'Bisasam', price: 500 },
  { name: 'Shiggy', price: 500 },
  { name: 'Relaxo', price: 500 },
  { name: 'Pickachu', price: 500 },
  { name: 'Mew', price: 500 },
  { name: 'Mewto', price: 500 },
  { name: 'Garados', price: 500 },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO pokemons
	${sql(pokemons, 'name', 'price')}

`;
};

exports.down = async (sql) => {
  for (const pokemon of pokemons) {
    await sql`
		DELETE FROM pokemons WHERE
		name = ${pokemon.name} AND
		price = ${pokemon.price}
			`;
  }
};
