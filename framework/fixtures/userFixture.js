import { faker } from '@faker-js/faker';

export function generateUserCredentials() {
  return {
    userName: faker.internet.email(),
    password: '123Password!'
  };
}
