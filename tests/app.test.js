import { nameIsValid, fullTrim, getTotal } from '../src/app.js';

describe ('app.js', () => {

    describe ('function fullTrim', () => {

        test ('null is converted to an empty string', () => {
let text = null;
const result = fullTrim(text);
expect (result).toBe('');
        });
        test ('undefined is converted to an empty string', () => {
let text;
const result = fullTrim(text);
expect (result).toBe('');
        });
        test ('any space symbols are deleted', () => {
let text = ' Test\ttest test\n';
const result = fullTrim(text);
expect (result).toBe('Testtesttest');
        });
        test ('consecutive space symbols are deleted', () => {
let text = '\t\tTest\t\ntest  test\n\n';
const result = fullTrim(text);
expect (result).toBe('Testtesttest');
        });
        test ('throws an error for number', () => {
let text = 123;
expect ( () => fullTrim(text)).toThrow();
        })
    });
      describe ('function nameIsValid', () => {

        test ('Выдача true если передана строка длиной больше 2 символов, которая содержит только строчные буквы латиницы', () => {
let name = 'elena';
const result = nameIsValid(name);
expect(result).toBe(true);
        });
        test ('Выдача false если передано число', () => {
let name = 123;
const result = nameIsValid(name);
expect(result).toBe(false);
        });
        test ('Выдача false если передано undefined', () => {
let name;
const result = nameIsValid(name);
expect(result).toBe(false);
        });
        test ('Выдача true если передана строка длиной 2 символа, содержит только строчные буквы латиницы', () => {
let name = 'ab';
const result = nameIsValid(name);
expect(result).toBe(true);
        });
        test ('Выдача false если передана строка длиной 1 символ, которая содержит только строчные буквы латиницы', () => {
let name = 'z';
const result = nameIsValid(name);
expect(result).toBe(false);
        });
        test ('Выдача false если передана строка длиной 0 символов', () => {
let name = '';
const result = nameIsValid(name);
expect(result).toBe(false);
        });
        test ('Выдача false если передана строка длиной более 2 символов, содержит только латиницу, есть заглавная буква', () => {
let name = 'Elena';
const result = nameIsValid(name);
expect(result).toBe(false);
        });

    test ('Выдача false если передана строка длиной более 2 символов, содержит только строчные буквы латиницы, есть пробел', () => {
let name = 'elena ';
const result = nameIsValid(name);
expect(result).toBe(false);
        });
        test ('Выдача false если передана строка длиной более 2 символов, содержит только строчные буквы, есть буквы кириллицы', () => {
let name = 'elenат';
const result = nameIsValid(name);
expect(result).toBe(false);
        });
 });
  describe ('function getTotal', () => {
const validCases = [
  {
        name: 'Скидка 0%',
        items: [
                {price: 10, quantity: 5},
                {price: 20, quantity: 3},
                {price: 30, quantity: 3}
        ],
        discount: 0,
        expected: 200
  }, 
   {
        name: 'Скидка 1%',
        items: [
                {price: 20, quantity: 5},
                {price: 40, quantity: 10}
        ],
        discount: 1,
        expected: 495
  }, 
  {
        name: 'Скидка 50%',
        items: [
                {price: 100, quantity: 5},
                {price: 50, quantity: 10}
        ],
        discount: 50,
        expected: 500
  }, 
   {
        name: 'Скидка 99%',
        items: [
                {price: 10, quantity: 5},
                {price: 50, quantity: 1}
        ],
        discount: 99,
        expected: 1
  }     
]
        test.each(validCases) ('$name', ({ items, discount, expected }) => {
const result = getTotal(items, discount);
expect(result).toBeCloseTo(expected, 1);
        });

        test ('Скмдка не число', () => {
const items = [
                {price: 10, quantity: 5},
                {price: 50, quantity: 1}
        ];
const discount = '5';
expect ( () => getTotal(items, discount) ).toThrow('Скидка должна быть числом');
        });
         test ('Скмдка 100%', () => {
const items = [
                {price: 10, quantity: 5},
                {price: 50, quantity: 1}
        ];
const discount = 100;
expect ( () => getTotal(items, discount) ).toThrow('Процент скидки должен быть от 0 до 99');
        });
    });
})