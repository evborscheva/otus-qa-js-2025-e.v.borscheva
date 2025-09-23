import 'dotenv/config';

const config = {
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? 'https://bookstore.demoqa.com',
  userId: process.env.TEST_BOOKSTORE_USER_ID,
  username: process.env.TEST_BOOKSTORE_USERNAME,
  password: process.env.TEST_BOOKSTORE_PASSWORD
};

export default Object.freeze(config);
