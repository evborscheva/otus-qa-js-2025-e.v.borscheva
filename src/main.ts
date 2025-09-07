const helloPrefix = 'Hello, ';

function greet(name: any) {
  return `${helloPrefix} ${name}!`;
}
console.log(greet('World'));
