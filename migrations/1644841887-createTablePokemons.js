exports.up = async (sql) => {
  console.log('creating table...');
  await sql`
	 CREATE TABLE pokemons (
	 	id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	 	name varchar(20) NOT NULL,
	 	price integer NOT NULL
		 );
`;
};

exports.down = async (sql) => {
  console.log('dropping table...');
  await sql`
	DROP TABLE pokemons
	`;
};
