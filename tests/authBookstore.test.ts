import { AuthService, UserService, UserFixture } from '../framework';

describe('Bookstore - auth', () => {
  let newUser: any;

  beforeAll(async () => {
    newUser = UserFixture.generateUserCredentials();
    const responseCreateUser = await UserService.create(newUser);
  });

  test('Проверка авторизации пользователя: пользователь не авторизован', async () => {
    const response = await AuthService.authorized(newUser);

    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });

  (test('Успешная генерация токена', async () => {
    const response = await AuthService.generateToken(newUser);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      token: expect.any(String),
      status: 'Success',

      expires: expect.any(String),
      result: 'User authorized successfully.'
    });
  }),
    test('Неуспешная генерация токена: передано пустое значение пароля', async () => {
      const userData = {
        userName: newUser.userName,
        password: ''
      };
      const response = await AuthService.generateToken(userData);

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('code');
      expect(response.data).toHaveProperty('message', 'UserName and Password required.');
      expect(response.data.code).not.toBeNull();
    }),
    test('Неуспешная генерация токена: передан неверный пароль', async () => {
      const userData = {
        userName: newUser.userName,
        password: '123QWE'
      };

      const response = await AuthService.generateToken(userData);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        token: null,
        status: 'Failed',
        expires: null,
        result: 'User authorization failed.'
      });
    }));
});
