import config from '../framework/config/configBookstore';
import { BookService, AuthService } from '../framework';
import { books } from '../framework/fixtures/Books.json';

describe('Books', () => {
  /*if (books.length < 3) {
    throw new Error('Массив books должен содержать как минимум 3 элемента');
  }*/

  const userId = config.userId!;
  const [book1, book2, book3] = books;
  const isbn = book1!.isbn;

  let token: any;

  beforeAll(async () => {
    const response = await AuthService.generateToken({
      userName: config.username,
      password: config.password
    });

    token = response.data.token;
  });

  test('Получение информации о книге с существующим ISBN', async () => {
    const response = await BookService.getBook(isbn);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      isbn: isbn,
      title: book1!.title,
      subTitle: book1!.subTitle,
      author: book1!.author,
      publish_date: book1!.publish_date,
      publisher: book1!.publisher,
      pages: book1!.pages,
      description: expect.any(String),
      website: expect.any(String)
    });
  });

  test('Получение информации о книге с НЕсуществующим ISBN', async () => {
    const badIsbn = '97814493377';
    const response = await BookService.getBook(badIsbn);

    expect(response.status).toBe(400);
    expect(response.data).toHaveProperty('code');
    expect(response.data.code).not.toBeNull();
    expect(response.data).toHaveProperty('message', 'ISBN supplied is not available in Books Collection!');
  });

  const data = [
    {
      name: 'Добавление 1 книги в коллекцию пользователя',
      isbns: [isbn],
      expectedStatus: 201,
      result: { books: [{ isbn: isbn }] }
    },
    {
      name: 'Добавление в коллекцию пользователя книги, которая там уже есть',
      isbns: [isbn],
      expectedStatus: 400,
      result: {
        code: '1210',
        message: "ISBN already present in the User's Collection!"
      }
    },
    {
      name: 'Добавление 2 книг в коллекцию пользователя',
      isbns: [book3!.isbn, book2!.isbn],
      expectedStatus: 201,
      result: { books: [{ isbn: book3!.isbn }, { isbn: book2!.isbn }] }
    },
    {
      name: 'Не указан идентификатор книги при добавлении в коллекцию',
      isbns: [],
      expectedStatus: 400,
      result: {
        code: '1207',
        message: 'Collection of books required.'
      }
    }
  ];

  test.each(data)('$name', async ({ isbns, expectedStatus, result }: any) => {
    const response = await BookService.addList({
      userId,
      isbns,
      token
    });

    expect(response.data).toEqual(result);
    expect(response.status).toBe(expectedStatus);
  });

  test('Удаление книги из коллекции пользователя', async () => {
    const response = await BookService.remove({ isbn, userId, token });
    expect(response.status).toBe(204);
  });

  test('Заменить книгу в коллекции пользователя', async () => {
    const response = await BookService.replace({
      userId,
      fromIsbn: book2!.isbn,
      toIsbn: isbn,
      token
    });
    expect(response.data).toEqual({
      userId,
      username: config.username,
      books: [book3, book1]
    });
  });

  afterAll(async () => {
    await BookService.removeAll({
      userId,
      token
    });
  });
});
