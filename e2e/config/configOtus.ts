import 'dotenv/config';

const config = {
  login: process.env.TEST_SAUCEDEMO_LOGIN,
  password: process.env.TEST_SAUCEDEMO_PASSWORD
};

export default Object.freeze(config);
