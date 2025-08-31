const baseUrl = 'https://bookstore.demoqa.com';
describe('Account Service', () => {
  (test('Успешное создание пользователя', async () => {
    const userData = {
      userName: 'string1234568',
      password: '123QWEggg!'
    };
    const response = await fetch(`${baseUrl}/Account/v1/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    expect(response.status).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('userID');
    expect(responseBody).toHaveProperty('username');
    expect(responseBody).toHaveProperty('books');
    expect(responseBody.username).toBe(userData.userName);
    expect(responseBody.userID).toBeDefined();
    expect(responseBody.userID).not.toBeNull();
  }),
    test('Неуспешное создание пользователя: пользователь уже есть', async () => {
      const userData = {
        userName: 'string1234568',
        password: '123QWEggg!'
      };
      const response = await fetch(`${baseUrl}/Account/v1/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      expect(response.status).toBe(406);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('code');
      expect(responseBody).toHaveProperty('message');
      expect(responseBody.message).toBe('User exists!');
      expect(responseBody.code).not.toBeNull();
    }),
    test('Неуспешное создание пользователя: пароль не соответствует требованиям', async () => {
      const userData = {
        userName: 'string1234568string',
        password: '123'
      };
      const response = await fetch(`${baseUrl}/Account/v1/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('code');
      expect(responseBody).toHaveProperty('message');
      expect(responseBody.message).toBe(
        "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
      );
      expect(responseBody.code).not.toBeNull();
    }),
    test('Успешная генерация токена', async () => {
      const userData = {
        userName: 'string1234568',
        password: '123QWEggg!'
      };
      const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('token');
      expect(responseBody).toHaveProperty('expires');
      expect(responseBody).toHaveProperty('status');
      expect(responseBody).toHaveProperty('result');

      expect(responseBody.result).toBe('User authorized successfully.');
      expect(responseBody.token).not.toBeNull();
      expect(responseBody.status).toBe('Success');
      expect(responseBody.expires).not.toBeNull();
    }),
    test('Неуспешная генерация токена: передано пустое значение пароля', async () => {
      const userData = {
        userName: 'string1234568',
        password: ''
      };
      const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('code');
      expect(responseBody).toHaveProperty('message');

      expect(responseBody.message).toBe('UserName and Password required.');
      expect(responseBody.code).not.toBeNull();
    }),
    test('Неуспешная генерация токена: передан неверный пароль', async () => {
      const userData = {
        userName: 'string1234568',
        password: '123QWE'
      };
      const response = await fetch(`${baseUrl}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('token');
      expect(responseBody).toHaveProperty('expires');
      expect(responseBody).toHaveProperty('status');
      expect(responseBody).toHaveProperty('result');

      expect(responseBody.result).toBe('User authorization failed.');
      expect(responseBody.token).toBeNull();
      expect(responseBody.status).toBe('Failed');
      expect(responseBody.expires).toBeNull();
    }));
});
