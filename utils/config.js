import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

export { MONGODB_URI, PORT };
