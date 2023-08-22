import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

let mongo;
if (process.env.NODE_ENV === 'test') {
  mongo = process.env.TEST_MONGODB_URI;
} else {
  mongo = process.env.MONGODB_URI;
}
const MONGODB_URI = mongo;

export { MONGODB_URI, PORT };
