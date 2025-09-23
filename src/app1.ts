const scores = {
  Elena: 10,
  Ekaterina: 5,
  Ivan: 5,
  Igor: 8
};

function getScore(object: any) {
  let sum = 0;
  for (const key in object) {
    sum = sum + object[key];
  }
  return sum;
}
console.log(getScore(scores));
