import { AuthService, UserService, UserFixture } from '../framework';

describe('Bookstore', () => {
  let token;
  let userId;
  let newUser;

  beforeAll(async () => {
    newUser = UserFixture.generateUserCredentials();
    const responseCreateUser = await UserService.create(newUser);
    userId = responseCreateUser.data.userID;
    const responseGenerateToken = await AuthService.generateToken(newUser);
    token = responseGenerateToken.data.token;
  });

  test('Проверка авторизации пользователя: пользователь авторизован', async () => {
    const response = await AuthService.authorized(newUser);
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  /* test('Получение данных о пользователе', async () => {
    const response = await UserService.get({ userId, token });
    expect(response.status).toBe(200);
    expect(response.data.userId).toBe(userId);
    expect(response.data.username).toBe(newUser.userName);
  });*/

  test('Получение данных о пользователе', async () => {
    const response = await UserService.get({ userId, token });
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      userId: userId,
      username: newUser.userName,
      books: []
    });
  });

  test('Удаление пользователя', async () => {
    const response = await UserService.remove({ userId, token });
    expect(response.status).toBe(204);
    expect(response.data).not.toBeNull();
  });
});
