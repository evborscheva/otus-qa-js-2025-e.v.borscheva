const scores = {
 Elena: 10, 
 Ekaterina: 5,
 Ivan: 5, 
 Igor: 8
};

function getScore(object) {
  let sum = 0;
  for (let key in object) {
  sum = sum + object[key];
 }
 return sum;
}
console.log ( getScore(scores) );