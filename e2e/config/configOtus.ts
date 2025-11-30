import 'dotenv/config';

const config = {
  login: process.env.TEST_OTUS_LOGIN,
  password: process.env.TEST_OTUS_PASSWORD
};

export default Object.freeze(config);
