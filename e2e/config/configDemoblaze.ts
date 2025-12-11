import 'dotenv/config';

const config = {
  login: process.env.TEST_DEMOBLAZE_LOGIN,
  password: process.env.TEST_DEMOBLAZE_PASSWORD
};

export default Object.freeze(config);
