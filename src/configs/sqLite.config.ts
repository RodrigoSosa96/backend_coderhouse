import * as path from 'path';

const options = {
	client: 'sqlite3',
	connection: {
		filename: path.resolve('db', 'ecommerce_coderhouse.sqlite'),
	},
	useNullAsDefault: true,
};

export default options;
